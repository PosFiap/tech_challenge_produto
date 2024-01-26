import { Router } from 'express'
import { ProdutoHTTP } from '../../adapter/http/produto'
import { ProdutoController } from '../../adapter/controller/ProdutoController'

const router: Router = Router()


const produtoHTTP = new ProdutoHTTP(
  ProdutoController.create()
)



router.use('/health', (_req, res) => res.sendStatus(200))
router.use('/produto', produtoHTTP.getRouter())


export { router }
