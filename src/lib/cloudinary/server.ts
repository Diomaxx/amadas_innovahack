import "server-only";

import { createHash } from "crypto";

type MaybeString = string | undefined;

function requiredEnv(value: MaybeString, envName: string) {
  if (!value) {
    throw new Error(`Missing required env var: ${envName}`);
  }

  return value;
}

function getCloudinaryCloudName() {
  return (
    process.env.CLOUDINARY_CLOUD_NAME ??
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  );
}

function getCloudinaryApiKey() {
  return process.env.CLOUDINARY_API_KEY ?? process.env.CLAUDINARY_CLOUD_KEY;
}

function getCloudinaryApiSecret() {
  return process.env.CLOUDINARY_API_SECRET;
}

export function getCloudinaryServerConfig() {
  const cloudName = requiredEnv(
    getCloudinaryCloudName(),
    "CLOUDINARY_CLOUD_NAME (or NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME)",
  );
  const apiKey = requiredEnv(
    getCloudinaryApiKey(),
    "CLOUDINARY_API_KEY (or CLAUDINARY_CLOUD_KEY)",
  );
  const apiSecret = requiredEnv(getCloudinaryApiSecret(), "CLOUDINARY_API_SECRET");

  return { cloudName, apiKey, apiSecret };
}

type SignablePrimitive = string | number | boolean | undefined;
type SignableParams = Record<string, SignablePrimitive>;

function buildSignaturePayload(params: SignableParams) {
  return Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== "")
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
}

function signParams(params: SignableParams, apiSecret: string) {
  const payload = buildSignaturePayload(params);
  const signature = createHash("sha1")
    .update(`${payload}${apiSecret}`)
    .digest("hex");

  return signature;
}

export type CreateSignedUploadInput = {
  folder?: string;
  publicId?: string;
  tags?: string[] | string;
  context?: string;
  resourceType?: "auto" | "image" | "video" | "raw";
};

export function createSignedUploadPayload(input: CreateSignedUploadInput = {}) {
  const { cloudName, apiKey, apiSecret } = getCloudinaryServerConfig();
  const timestamp = Math.floor(Date.now() / 1000);
  const tags = Array.isArray(input.tags) ? input.tags.join(",") : input.tags;

  const paramsToSign: SignableParams = {
    timestamp,
    folder: input.folder?.trim() || undefined,
    public_id: input.publicId?.trim() || undefined,
    tags: tags?.trim() || undefined,
    context: input.context?.trim() || undefined,
  };

  const signature = signParams(paramsToSign, apiSecret);
  const resourceType = input.resourceType ?? "auto";

  return {
    cloudName,
    apiKey,
    timestamp,
    signature,
    folder: paramsToSign.folder,
    publicId: paramsToSign.public_id,
    tags: paramsToSign.tags,
    context: paramsToSign.context,
    resourceType,
    uploadUrl: `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
  };
}
