import React from 'react'
import * as C from './styles'
import pizza from './img/pizza.png'
import reload from './img/reload.png'
import tip from './img/tip.png'
import next from './img/next.png'
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const TelaQuestao = () => {

    const [questoes, setQuestoes] = useState([])
    useEffect(() => {
        const getQuestao = async () => {
            try {
                const response = await axios.get("http://localhost:3001/questao/alternativa/1")
                setQuestoes(response.data)
            } catch (err) {
                console.log(err);
            }
        };
        getQuestao();
    }, []);

    const [resposta, setResposta] = useState('')
    const [btnnext, setBtnNext] = useState(true);
    const [toogle, setToogle] = React.useState(true);
    const [toogle2, setToogle2] = React.useState(true);
    const [toogle3, setToogle3] = React.useState(true);
    const [toogle4, setToogle4] = React.useState(true);
    const [cor1, setCor1] = React.useState('white');
    const [cor2, setCor2] = React.useState('white');
    const [cor3, setCor3] = React.useState('white');
    const [cor4, setCor4] = React.useState('white');

    useEffect(() => {
        if (toogle === false) {
            setCor1('#5BC0A4')
        }
        if (toogle2 === false) {
            setCor2('#D42E3F')
        }
        if (toogle3 === false) {
            setCor3('#D42E3F')
        }
        if (toogle4 === false) {
            setCor4('#D42E3F')
        }
    }, [toogle, toogle2, toogle3, toogle4])

    const handleAlternativa = async (resposta, cor) => {
        console.log(resposta)
        if (resposta === "Correta") {
            setBtnNext(false)
            if (cor === 'cor1') {
                setToogle(false)
            } else if (cor === 'cor2') {
                setToogle2(false)
            } else if (cor === 'cor3') {
                setToogle3(false)
            } else if (cor === 'cor4') {
                setToogle4(false)
            }
        } else {
            if (cor === 'cor1') {
                setToogle(false)
            } else if (cor === 'cor2') {
                setToogle2(false)
            } else if (cor === 'cor3') {
                setToogle3(false)
            } else if (cor === 'cor4') {
                setToogle4(false)
            }
        }
    }
    //verifcar se a resposta está correta
    const handleVerificar = async (cor, alternativa) => {
        var body = {
            "id": 1,
            "alternativa": alternativa
          }
        try {
            const response = await axios.post("http://localhost:3001/questao/verificar", body)
            setResposta(response.data.message);
            handleAlternativa(response.data.message, cor)   
        } catch (err) {
            console.log(err);
        }
    }

    const handleReaload = () => {
        setToogle(true)
        setToogle2(true)
        setToogle3(true)
        setToogle4(true)
        setCor1('white')
        setCor2('white')
        setCor3('white')
        setCor4('white')
        setBtnNext(true)
    }


    return (
        <>
            <C.Header>
                <C.Titulo>MODULO I - Frações</C.Titulo>
            </C.Header>
            <C.Questao>
                <C.Enunciado>
                    <C.TextoEnunciado>1-{questoes.enunciado}</C.TextoEnunciado>
                </C.Enunciado>
                <C.DivImagem>
                    <img src={pizza} alt="questao1" border="0" />
                </C.DivImagem>
                <C.Alternativas>
                    <C.Alternativa style={{ background: cor1 }} onClick={() => handleVerificar('cor1', questoes.alternativa1)} >
                        <C.TextoAlternativa >{questoes.alternativa1}</C.TextoAlternativa>
                    </C.Alternativa>
                    <C.Alternativa style={{ background: cor2 }} onClick={() => handleVerificar('cor2', questoes.alternativa2)}>
                        <C.TextoAlternativa>{questoes.alternativa2}</C.TextoAlternativa>
                    </C.Alternativa>
                    <C.Alternativa style={{ background: cor3 }} onClick={() => handleVerificar('cor3', questoes.alternativa3)}>
                        <C.TextoAlternativa>{questoes.alternativa3}</C.TextoAlternativa>
                    </C.Alternativa>
                    <C.Alternativa style={{ background: cor4 }} onClick={() => handleVerificar('cor4', questoes.alternativa4)}>
                        <C.TextoAlternativa>{questoes.alternativa4}</C.TextoAlternativa>
                    </C.Alternativa>
                </C.Alternativas>
            </C.Questao>
            <C.ContainerMenu>
                <C.BtnReload onClick={() => handleReaload()} ><C.iconButton src={reload} alt='Refazer'></C.iconButton>Refazer</C.BtnReload>
                <C.BtnTip><C.IconTip src={tip} alt='Dica'></C.IconTip>Dica</C.BtnTip>
                <C.BtnNext disabled={btnnext} ><C.iconButton src={next} alt='Próximo'></C.iconButton>Próximo</C.BtnNext>
            </C.ContainerMenu>
        </>
    )
}

export default TelaQuestao