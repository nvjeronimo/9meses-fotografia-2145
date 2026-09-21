import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { z } from "zod";
import { S3_BUCKET, s3 } from "../lib/s3";
import { authed } from "../middleware/auth";

/** Admin-only direct-to-Tigris upload. Objects are served back through /api/files/*. */
export const upload = {
  presign: authed
    .input(z.object({ filename: z.string(), contentType: z.string() }))
    .handler(async ({ input }) => {
      const safeName = input.filename.replace(/[^\w.-]+/g, "-").toLowerCase();
      const key = `photos/${Date.now()}-${safeName}`;

      const url = await getSignedUrl(
        s3,
        new PutObjectCommand({
          Bucket: S3_BUCKET,
          Key: key,
          ContentType: input.contentType,
        }),
        { expiresIn: 600 },
      );

      return { url, key, publicUrl: `/api/files/${key}` };
    }),
};
