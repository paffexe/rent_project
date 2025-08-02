import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import * as cookieParser from "cookie-parser";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  app.setGlobalPrefix("api");
  const PORT = config.get<number>("PORT");
  app.use(cookieParser());

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Rent service API")
    .setDescription("API documentation for Exam 4 and related entities")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api/docs", app, document);

  await app.listen(PORT ?? 3030, () => {
    console.log(`Server running on port: ${PORT}`);
  });
}
start();
