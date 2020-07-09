module.exports = async function (id) {
    let lista = localStorage.getItem('listaFilho')
    if (lista !== null) {
        try {
            lista = lista.split(',')
            if (lista.indexOf(id) < 0) {
                localStorage.setItem(`listaFilho`, localStorage.getItem('listaFilho') + id + ',')
            } else {
                const listaAtualizada = lista.slice(0, lista.indexOf(id)).concat(lista.slice(lista.indexOf(id) + 1, lista.length))
                localStorage.setItem(`listaFilho`, listaAtualizada)
            }
        } catch (error) {

        }
    } else {
        localStorage.setItem(`listaFilho`, id + ',')
    }
}