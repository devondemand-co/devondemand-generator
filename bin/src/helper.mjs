import * as fs from 'fs';
import path from "path";
const __dirname = path.resolve();

const generateMaterialUIRelatedFiles = (options) => {
	return new Promise((resolve, reject) => {
		try {
			if (options.technology === "NextJS") {
				writeTofileinProject(
					"../" + options.appName + "/src",
					"theme.js",
					"./bin/src/data/nextjs/theme.js"
				);
				writeTofileinProject(
					"../" + options.appName + "/pages",
					"_app.js",
					"./bin/src/data/nextjs/_app.js"
				);
				writeTofileinProject(
					"../" + options.appName + "/pages",
					"_document.js",
					"./bin/src/data/nextjs/_document.js"
				);
				resolve();
			} else if (options.technology === "Pure React") {
				writeTofileinProject(
					"../" + options.appName + "/src",
					"index.js",
					"./bin/src/data/cra/index.mjs"
				);
				writeTofileinProject(
					"../" + options.appName + "/public",
					"index.html",
					"./bin/src/data/cra/index.html"
				);
				writeTofileinProject(
					"../" + options.appName + "/src",
					"theme.js",
					"./bin/src/data/cra/theme.js"
				);
				writeTofileinProject(
					"../" + options.appName + "/src",
					"serviceWorker.js",
					"./bin/src/data/cra/serviceWorker.js"
				);
				resolve();
			} else if (options.technology === "GatsbyJS") {
				writeTofileinProject(
					"../" + options.appName,
					"gatsby-browser.js",
					"./bin/src/data/gatsby/gatsby-browser.mjs"
				);
				writeTofileinProject(
					"../" + options.appName,
					"gatsby-config.js",
					"./bin/src/data/gatsby/gatsby-config.mjs"
				);

				resolve();
			} else {
				resolve();
			}
		} catch (error) {
			reject(error);
		}
	});
};

const writeTofileinProject = (filePath, fileName, fileWithData) => {
	filePath = makedir(filePath);
	fileName = (filePath + "/" + fileName).replace(/\\/g, "/");
	fileWithData = path.resolve(__dirname, fileWithData).replace(/\\/g, "/");
	var data = fs.readFileSync(fileWithData, "utf-8");
	fs.writeFileSync(fileName, data, "utf-8", { flag: "wx" });
	return true;
};

const makedir = (filePath) => {
	filePath = path.resolve(process.cwd(), filePath).replace(/\\/g, "/");
	fs.mkdirSync(filePath, { recursive: true });
	return filePath;
};

const addRequiredFolders = (options) => {
	return new Promise((resolve, reject) => {
		try {
			if (
				options.technology === "NextJS" ||
				options.technology === "Pure React"
			) {
				makedir("../" + options.appName + "/src/api");
				makedir("../" + options.appName + "/src/assets/data");
				makedir("../" + options.appName + "/src/assets/fonts");
				makedir("../" + options.appName + "/src/assets/icons");
				makedir("../" + options.appName + "/src/assets/images");
				makedir("../" + options.appName + "/src/components");
				makedir("../" + options.appName + "/src/features");
				makedir("../" + options.appName + "/src/helpers");
				makedir("../" + options.appName + "/src/reducer");
				makedir("../" + options.appName + "/src/themes");
			} else if (options.technology === "GatsbyJS") {
				makedir("../" + options.appName + "/src/api");
				makedir("../" + options.appName + "/src/assets/data");
				makedir("../" + options.appName + "/src/assets/fonts");
				makedir("../" + options.appName + "/src/assets/icons");
				makedir("../" + options.appName + "/src/assets/images");
				makedir("../" + options.appName + "/src/layouts");
				makedir("../" + options.appName + "/src/features");
				makedir("../" + options.appName + "/src/helpers");
				makedir("../" + options.appName + "/src/reducer");
				makedir("../" + options.appName + "/src/themes");
			}
			writeTofileinProject(
				"../" + options.appName,
				".eslintignore",
				"./bin/src/data/lint/.eslintignore"
			);
			writeTofileinProject(
				"../" + options.appName,
				".eslintrc",
				"./bin/src/data/lint/.eslintrc"
			);
			writeTofileinProject(
				"../" + options.appName,
				".prettierignore",
				"./bin/src/data/lint/.prettierignore"
			);
			writeTofileinProject(
				"../" + options.appName,
				".prettierrc",
				"./bin/src/data/lint/.prettierrc"
			);
			writeTofileinProject(
				"../" + options.appName,
				"jsconfig.json",
				"./bin/src/data/lint/jsconfig.json"
			);
			resolve();
		} catch (error) {
			reject(error);
		}
	});
};

export {
	generateMaterialUIRelatedFiles,
	addRequiredFolders,
};
