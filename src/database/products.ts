import prisma from './dbConfig';

export default async function handler(req:any, res:any) {
  if (req.method === 'GET') {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } else if (req.method === 'POST') {
    const { name, priceInCents, filePath, imagePath, description } = req.body;
    const newProduct = await prisma.product.create({
      data: {
        name,
        priceInCents,
        filePath,
        imagePath,
        description,
      },
    });
    res.status(201).json(newProduct);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
