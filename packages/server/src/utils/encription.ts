import crypto from "crypto";

const algorithm = "aes-256-ctr";
const secretKey = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";
const iv = crypto.randomBytes(16);

export const encrypt = (text: string) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return encrypted.toString("hex");
};

export const decrypt = (encryptedText: string) => {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(encryptedText, "hex")),
    decipher.final(),
  ]);

  return decrpyted.toString();
};
