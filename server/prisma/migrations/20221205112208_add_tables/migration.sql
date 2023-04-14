-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductAttributeGroup" (
    "productId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "ProductAttributeGroup_pkey" PRIMARY KEY ("productId","groupId")
);

-- CreateTable
CREATE TABLE "AttributeGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "multipleSelection" BOOLEAN NOT NULL,

    CONSTRAINT "AttributeGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttributeGroupAttribute" (
    "attributeId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "selected_by_default" BOOLEAN NOT NULL,
    "min" INTEGER NOT NULL,
    "max" INTEGER NOT NULL,
    "price" DECIMAL(65,30),

    CONSTRAINT "AttributeGroupAttribute_pkey" PRIMARY KEY ("attributeId","groupId")
);

-- CreateTable
CREATE TABLE "Attribute" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "weight" DECIMAL(65,30) NOT NULL,
    "available" BOOLEAN NOT NULL,

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductAttributeGroup" ADD CONSTRAINT "ProductAttributeGroup_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAttributeGroup" ADD CONSTRAINT "ProductAttributeGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "AttributeGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttributeGroupAttribute" ADD CONSTRAINT "AttributeGroupAttribute_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttributeGroupAttribute" ADD CONSTRAINT "AttributeGroupAttribute_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "AttributeGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
