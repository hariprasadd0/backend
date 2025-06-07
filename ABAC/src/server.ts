import app from "./app.ts";
import Logger from "./utils/logger.ts";

const logger = new Logger('server');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	logger.info(`Server started on port ${PORT}`);
});
