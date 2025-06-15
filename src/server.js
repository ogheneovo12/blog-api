const { createServer } = require("http");
const config = require("./configs");
const app = require("./app");
const { configSchemaDto } = require("./configs/configs.dto");
const AppError = require("./common/app-error");
const { formatJoiError } = require("./utils");


function bootstrap() {
  //valiidate configuration
  const { error } = configSchemaDto.validate(config, { abortEarly: false });

  if (error) {
    throw new AppError(
      "Invalid Application Config",
      500,
      formatJoiError(error)
    );
  }
  //then load app
  app.loadAll(app).then(() => {
    const server = createServer(app);
    server.listen(config.PORT, () => {
      console.log(`server running on port ${config.PORT}`);
    });
  });
}

bootstrap();
