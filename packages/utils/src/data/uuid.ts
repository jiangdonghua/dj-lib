import { v4 as uuidv4 } from 'uuid'
export function getId() {
  const id = uuidv4()
  return id.replace(/-/g, '')
}

export function createId(name: string = '') {
  return name + (Math.random() + Date.now()).toString(36).replace('.', '')
}
