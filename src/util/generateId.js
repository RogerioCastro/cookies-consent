/**
 * Gera um ID parecido com ObjectId do MongoDB
 * via: https://gist.github.com/solenoid/1372386
 *
 * @param {String} className Nome da classe
 */
export default function generateId () {
  var timestamp = (new Date().getTime() / 1000 | 0).toString(16)

  return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
    return (Math.random() * 16 | 0).toString(16)
  }).toLowerCase()
}
