import app from "./app";
import config from "./lib/config";

async function main() {
  app.listen(config.PORT, () => {
    console.log(`API server running at http://localhost:${config.PORT}`);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
