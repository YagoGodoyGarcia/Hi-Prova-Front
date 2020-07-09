import React from 'react';
import logo from '../Img/logo.svg';
import dados from '../data.json'
import icon from '../Img/icon.svg'
import SalvarFilho from './SalvarFilho.js'
import SalvarPai from './SalvarPai.js'
import CarregarSelecionados from './CarregarSelecionados.js'
import '../Css/estilo.css'

class Dados extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listaDados: []
        }
    }
    componentDidMount() {
        const listaDados = Object.values(dados)
        listaDados.forEach(element => {
            element.children = Object.values(element.children)
        })

        this.setState({ listaDados })

        setTimeout(function () {
            CarregarSelecionados(localStorage.getItem('listaFilho'))
            CarregarSelecionados(localStorage.getItem('listaPai'))
        }, 3000);
    }

    MostrarLista = id => () => {
        let data = document.getElementById(id)
        let icon = document.getElementById('img' + id)
        if (data.style.display === 'none') {
            data.style.display = 'block'
            icon.className = 'IconeInverso'
        } else {
            data.style.display = 'none'
            icon.className = 'Icone'
        }
    }
    SelecionarTodos = id => () => {
        let base = document.getElementById(id)
        let lista = base.querySelectorAll('input[type="checkbox"]')
        let cbPai = document.getElementById('cb' + id)
        if (cbPai.checked !== false) {
            let check = document.getElementById('span' + id)
            check.className = 'checkmark'
            SalvarPai('cb' + id)
            lista.forEach(element => {
                element.checked = true
                SalvarFilho(element.id)
            });
        } else {
            SalvarPai('cb' + id)
            lista.forEach(element => {
                element.checked = false
                SalvarFilho(element.id)
            });
        }
    }
    GuardarCheckbox = id => () => {
        SalvarFilho(id) 
        let elemento = document.getElementById(id).parentNode.parentNode.parentNode.id
        let base = document.getElementById(elemento)
        let lista = base.querySelectorAll('input[type="checkbox"]')
        let check = document.getElementById('span' + elemento)
        for(var i = 0; i < lista.length; i++){
            if(lista[i].checked !== true){
                check.className = 'checkmarkPai'
                break
            }else if(i == (lista.length-1)){
                check.className = 'checkmark'
            }
        }
    }
    render() {
        return (
            <div className='Base'>
                <center>
                    <header className="page-header">
                        <h1 className="page-title">Hi Platform</h1>
                        <h2 className="page-headline">Prova Front-end</h2>
                    </header>
                </center>
                <div style={{ display: 'grid' }}>
                    {this.state.listaDados.map((data) => (
                        <div>
                            <div className='ElementoPai'>
                                <label className='LabelName'>
                                    {data.name}
                                    <input id={'cb' + data.id} type='checkbox' className='Caixa'
                                        onClick={this.SelecionarTodos(data.id)}></input>
                                    <span id={'span' + data.id} className="checkmark"></span>
                                </label>
                                <img id={'img' + data.id} src={icon} className='Icone' onClick={this.MostrarLista(data.id)}></img>
                            </div>
                            <div id={data.id} className='ElementoFilho' value={data.name}>
                                {data.children.map((result) => (
                                    <div className='Lista'>
                                        <label className='LabelName'>
                                            {result.name}
                                            <input id={result.id} type='checkbox' onClick={this.GuardarCheckbox(result.id)} className='Caixa'></input>
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Dados;
