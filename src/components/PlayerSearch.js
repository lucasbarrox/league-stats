import React, { useState } from 'react';
import axios from 'axios';

const PlayerSearch = () => {
    const [riotId, setRiotId] = useState('');
    const [riotTag, setRiotTag] = useState('');
    const [playerData, setPlayerData] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if (!riotId || !riotTag) {
            setError('Por favor, insira o Riot ID e a Riot Tag.');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5000/api/player/${riotId}/${riotTag}`);
            console.log('Dados do jogador:', response.data);
            setPlayerData(response.data);
            setError('');
        } catch (err) {
            console.error('Erro ao buscar jogador:', err);
            setError('Jogador não encontrado. Verifique o ID e a tag.');
            setPlayerData(null);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Riot ID"
                value={riotId}
                onChange={(e) => setRiotId(e.target.value)}
            />
            <input
                type="text"
                placeholder="Riot Tag"
                value={riotTag}
                onChange={(e) => setRiotTag(e.target.value)}
            />
            <button onClick={handleSearch}>Buscar</button>

            {error && <p>{error}</p>}
            {playerData && (
                <div>
                    <h2>Dados do Jogador:</h2>
                    <p><strong>Nome:</strong> {playerData.gameName}</p>
                    <p><strong>ID:</strong> {playerData.puuid}</p>
                    <p><strong>Tag:</strong> {playerData.tagLine}</p>
                </div>
            )}
        </div>
    );
};

export default PlayerSearch;