import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Auth Service')
    .addTag('auth')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: 'wallets',
      protoPath: join(__dirname, './proto/wallet.proto'),
      url: `0.0.0.0:3001`,
    },
  });

  app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
