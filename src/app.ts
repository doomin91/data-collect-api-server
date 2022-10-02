import express, { Request, Response, NextFunction, Router } from 'express';
import { swaggerUi, specs } from './libs/swagger';
import Scheduler from './libs/scheduler'

export default class App {
  app; 

  constructor(controllers: any) {
    this.app = express();
    this.initializeAuthenticate();
    this.initializeControllers(controllers);
    // this.initializeScheduler(controllers);
    this.initializeErrorHandling();
  }

  listen() {
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    })
  }

  // JWT 등의 인증 Middelware, 여기서는 구현하지 않는다.
  initializeAuthenticate() {
  }

  // 예외처리 Middleware, 여기서는 구현하지 않는다.
  initializeErrorHandling() {
  }

  initializeScheduler(controllers: any) {
    const scheduler = new Scheduler(controllers)
  }

  initializeControllers(controllers: any) {
    const router:Router = Router();
    this.app.get('/', (req: Request, res:Response) => {
      res.send('OK');
    });

    controllers.forEach((controller: any) => {
      router.use(controller.router);
    })
    this.app.use('/api', router);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer:true }));
  }
}