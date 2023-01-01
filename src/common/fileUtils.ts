import { promises as fs } from 'fs'
export const readJson = async (filePath: string) => {
  const rawData = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(rawData).data
}

export const writeFile = async (filePath: string, data: string) => {
  await fs.writeFile(filePath, data)
}
