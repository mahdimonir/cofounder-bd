import { defineConfig } from "prisma/config";

export default defineConfig({
    schema: "prisma/schema.prisma",
    datasource: {
        url: "postgresql://neondb_owner:npg_uGjfsN7YVqJ1@ep-shy-poetry-a1t0fix7-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
    },
    migrations: {
        seed: "tsx prisma/seed.ts",
    },
});
