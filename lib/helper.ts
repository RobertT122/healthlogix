export function camelToDashed (camel) {
  return camel.replace(/[A-Z]/g, m => "-" + m.toLowerCase())
}

export function dashedToCamel (dashed) {
  return dashed.replace(/-([a-z])/g, m=> m[1].toUpperCase())
}

export function parseUrlFromText (text) {
  let reg = /\[(?<name>[^\]]*)\]\((?<link>[^\)]*)\)/g;
  let output;
  let i = 0;

  let mappedText = ''
  while((output = reg.exec(text)) !== null){
    mappedText += text.slice(i, output.index)
    i = output.index + output[0].length
    mappedText += `<a href=${output.groups.link}>${output.groups.name}</a>`
  }
  mappedText += text.slice(i)

  return mappedText;
}