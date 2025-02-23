import { writeFile, readFile } from "fs/promises";

const jsonFilePath = "./src/data/availableSet.json";

async function addSet(setName: string) {
  try {
    let sets: string[] = [];
    try {
      const fileContent = await readFile(jsonFilePath, "utf-8");
      sets = JSON.parse(fileContent);
    } catch (error) {
      console.log("📂 Fichier JSON non trouvé, création d'un nouveau...");
    }

    if (!sets.includes(setName)) {
      sets.push(setName);
      await writeFile(jsonFilePath, JSON.stringify(sets, null, 2), "utf-8");
      console.log(`✅ Set "${setName}" ajouté avec succès !`);
    } else {
      console.log(`⚠️ Le set "${setName}" est déjà dans la liste.`);
    }
  } catch (error) {
    console.error("❌ Erreur lors de l'ajout du set :", error);
  }
}

(async () => {
  await addSet("Shining Fates");
  await addSet("Evolving Skies");
  await addSet("Brilliant Stars");
})();
