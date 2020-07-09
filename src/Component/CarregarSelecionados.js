module.exports = async function (listaSelecionados) {
    let lista = listaSelecionados
    try {
        lista = lista.split(',')
        for (let i = 0; i < lista.length; i++) {
            if (lista[i] !== '') {
                document.getElementById(lista[i]).checked = true
            }
        }
    } catch (error) {
        console.log('lista vazia')
    }
}