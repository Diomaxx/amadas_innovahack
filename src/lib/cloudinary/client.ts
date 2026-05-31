"use client";

export type CloudinarySignRequest = {
  folder?: string;
  publicId?: string;
  tags?: string[] | string;
  context?: string;
  resourceType?: "auto" | "image" | "video" | "raw";
};

export type CloudinarySignedPayload = {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  signature: string;
  folder?: string;
  publicId?: string;
  tags?: string;
  context?: string;
  resourceType: "auto" | "image" | "video" | "raw";
  uploadUrl: string;
};

export type CloudinaryUploadResult = {
  assetId: string;
  publicId: string;
  secureUrl: string;
  width?: number;
  height?: number;
  format?: string;
  resourceType?: string;
  bytes?: number;
};

type CloudinaryUploadApiSuccess = {
  asset_id: string;
  public_id: string;
  secure_url: string;
  width?: number;
  height?: number;
  format?: string;
  resource_type?: string;
  bytes?: number;
};

type CloudinaryUploadApiError = {
  error?: {
    message?: string;
  };
};

export async function getCloudinaryUploadSignature(
  input: CloudinarySignRequest = {},
) {
  const response = await fetch("/api/cloudinary/sign", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => ({}))) as {
      error?: string;
    };
    throw new Error(payload.error ?? "Could not get Cloudinary signature");
  }

  return (await response.json()) as CloudinarySignedPayload;
}

export async function uploadFileToCloudinary(
  file: File,
  input: CloudinarySignRequest = {},
) {
  const signed = await getCloudinaryUploadSignature(input);
  const formData = new FormData();

  formData.append("file", file);
  formData.append("api_key", signed.apiKey);
  formData.append("timestamp", String(signed.timestamp));
  formData.append("signature", signed.signature);

  if (signed.folder) {
    formData.append("folder", signed.folder);
  }
  if (signed.publicId) {
    formData.append("public_id", signed.publicId);
  }
  if (signed.tags) {
    formData.append("tags", signed.tags);
  }
  if (signed.context) {
    formData.append("context", signed.context);
  }

  const response = await fetch(signed.uploadUrl, {
    method: "POST",
    body: formData,
  });

  const payload = (await response.json()) as
    | CloudinaryUploadApiSuccess
    | CloudinaryUploadApiError;

  if (!response.ok) {
    const errorPayload = payload as CloudinaryUploadApiError;
    throw new Error(
      errorPayload.error?.message ?? "Cloudinary upload failed unexpectedly",
    );
  }

  const success = payload as CloudinaryUploadApiSuccess;

  return {
    assetId: success.asset_id,
    publicId: success.public_id,
    secureUrl: success.secure_url,
    width: success.width,
    height: success.height,
    format: success.format,
    resourceType: success.resource_type,
    bytes: success.bytes,
  } as CloudinaryUploadResult;
}
