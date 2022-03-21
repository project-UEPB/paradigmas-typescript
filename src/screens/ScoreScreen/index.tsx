/* eslint-disable */
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { format } from "date-fns";
import { Botao } from '../../components/Botao';
import { useNavigate } from 'react-router-dom';

import './index.css';



const ScoreScreen = () => {
      
    const [scores, setScores] = useState() as any;
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            await api
            .get("/score/read")
            .then((response) => {
                setScores(response.data)
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
        }
        getData();
    }, []);

    const handlerGoToHome = () => {
        navigate("/", { replace: true });
    }

    return (
        <div className="container-jogo-score">
            <Botao
                onClick={handlerGoToHome}
                text="<"
                title="Voltar"
            />
            <div className="content-score">
            <h1 className="title-score">Ranking</h1>

            <table className="table-score">
                <thead>
                <tr>
                    <td>Nome</td>
                    <td>Pontuação</td>
                    <td>Data</td>
                    <td>Horário</td>
                </tr>
                </thead>
                <tbody>
                {scores ? scores.map((row: any, index: any) => ( index < 5 ?
                    (<tr key={row.id}>
                    <td>{row.name}</td>
                    <td>{row.score}</td>
                    <td>{format(new Date(row.created_at.toString()), "dd/MM/yyyy")}</td>
                    <td>{format(new Date(row.created_at.toString()), "HH:mm")}</td>
                    </tr>)
                    : null
                )) : null}
                </tbody>
            </table>
            </div>
        </div>
)};

export default ScoreScreen;
