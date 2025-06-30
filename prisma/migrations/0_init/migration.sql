-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE users (
    id VARCHAR(191) NOT NULL,
    name VARCHAR(191) NULL,
    email VARCHAR(191) NULL,
    "emailVerified" TIMESTAMP(3) NULL,
    image VARCHAR(191) NULL,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    role "UserRole" NOT NULL DEFAULT 'USER',
    stripe_customer_id VARCHAR(191) NULL,
    stripe_subscription_id VARCHAR(191) NULL,
    stripe_price_id VARCHAR(191) NULL,
    stripe_current_period_end TIMESTAMP(3) NULL,

    UNIQUE (email),
    UNIQUE (stripe_customer_id),
    UNIQUE (stripe_subscription_id),
    PRIMARY KEY (id)
);

-- CreateTable
CREATE TABLE accounts (
    id VARCHAR(191) NOT NULL,
    "userId" VARCHAR(191) NOT NULL,
    type VARCHAR(191) NOT NULL,
    provider VARCHAR(191) NOT NULL,
    "providerAccountId" VARCHAR(191) NOT NULL,
    refresh_token TEXT NULL,
    access_token TEXT NULL,
    expires_at INTEGER NULL,
    token_type VARCHAR(191) NULL,
    scope VARCHAR(191) NULL,
    id_token TEXT NULL,
    session_state VARCHAR(191) NULL,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT accounts_userId_idx FOREIGN KEY ("userId") REFERENCES users(id),
    UNIQUE (provider, "providerAccountId"),
    PRIMARY KEY (id)
);

-- CreateTable
CREATE TABLE sessions (
    id VARCHAR(191) NOT NULL,
    "sessionToken" VARCHAR(191) NOT NULL,
    "userId" VARCHAR(191) NOT NULL,
    expires TIMESTAMP(3) NOT NULL,

    UNIQUE ("sessionToken"),
    PRIMARY KEY (id),
    CONSTRAINT sessions_userId_idx FOREIGN KEY ("userId") REFERENCES users(id)
);

-- CreateTable
CREATE TABLE verification_tokens (
    identifier VARCHAR(191) NOT NULL,
    token VARCHAR(191) NOT NULL,
    expires TIMESTAMP(3) NOT NULL,

    UNIQUE (token),
    UNIQUE (identifier, token)
);

model trending_products {
  id          String   @id @default(cuid())
  title       String   @unique
  category    String?
  description String?
  status      String?  @default("new")
  image_url   String?
  created_at  DateTime @default(now())
  updated_at  DateTime @updatedAt
}
