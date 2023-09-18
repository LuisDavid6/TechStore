import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express()

router.put('/addToCart/:userId', async (req, res) => {
  const { userId } = req.params
  const { productId } = req.body
  try {
    //se busca el producto a agregar
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    })
    //se busca el usuario del carrito
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        cart: true,
      },
    })

    //se revisa si existe el producto en el carrito
    //@ts-ignore
    const productInCart = user?.cart?.products.find((e) => e.id === productId)

    //si existe se le suma 1 a cantidad y se le suma el precio al total de ese producto
    //despues se suma ese total al precio total a pagar en el carrito
    if (productInCart) {
      // @ts-ignore
      productInCart.cant = productInCart.cant + 1
      // @ts-ignore
      productInCart.totalValue = productInCart.totalPrice * productInCart.cant
      // @ts-ignore
      const totalCart = user.cart.total + productInCart.totalPrice
      //se convierte a json para guardar en bd
      JSON.stringify(product)

      //se actualiza el producto y el valor total del carrito
      await prisma.cart.update({
        where: {
          userId,
        },
        data: {
          // @ts-ignore
          products: user.cart.products,
          total: totalCart,
        },
      })

      // si no existe se guarda en el array productos del carrito y se agregan las propiedades
      // cant y totalValue al producto
    } else {
      // @ts-ignore
      product.cant = 1
      // @ts-ignore
      product.totalValue = product.totalPrice
      // @ts-ignore
      const totalCart = user.cart.total + product.totalPrice
      //se convierte a json para guardar en bd
      JSON.stringify(product)

      //se agrega el producto al array de productos y se actualiza el valor total del carrito
      await prisma.cart.update({
        where: {
          userId,
        },
        data: {
          products: {
            push: product,
          },
          total: totalCart,
        },
      })
    }
    res.json('Product added to cart')
  } catch (error) {
    res.json('ERROR')
  }
})

router.put('/removeToCart/:userId', async (req, res) => {
  const { userId } = req.params
  const { productId } = req.body

  try {
    //se busca el producto a remover
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    })
    //se busca el usuario del carrito
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        cart: true,
      },
    })

    //se filtra solo el producto que se va a remover
    //@ts-ignore
    const productInCart = user.cart.products.find((e) => e.id === productId)

    //si la cantidad de ese producto es 1 se elimina
    //@ts-ignore
    if (productInCart.cant === 1) {
      // @ts-ignore
      const totalCart = user.cart.total - productInCart.totalPrice

      // @ts-ignore
      const products = user.cart.products.filter((e) => e.id !== productInCart.id)

      //se convierte a json para guardar en bd
      JSON.stringify(products)

      //se actualiza el producto y el valor total del carrito
      await prisma.cart.update({
        where: {
          userId,
        },
        data: {
          // @ts-ignore
          products: products,
          total: totalCart,
        },
      })

      //si cant es mayor a 1 se le resta uno y se resta al valor total del carrito
    } else {
      // @ts-ignore
      productInCart.cant = productInCart.cant - 1
      // @ts-ignore
      productInCart.totalValue = productInCart.totalValue - productInCart.totalPrice
      // @ts-ignore
      const totalCart = user.cart.total - productInCart.totalPrice
      //se convierte a json para guardar en bd
      // @ts-ignore
      JSON.stringify(user.cart.products)

      //se actualiza la cant de ese producto y el valor total del carrito
      await prisma.cart.update({
        where: {
          userId,
        },
        data: {
          // @ts-ignore
          products: user.cart.products,
          total: totalCart,
        },
      })
    }

    res.json('Product removed from cart')
  } catch (error) {
    res.json('Error')
  }
})

export default router
