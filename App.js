import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  /*sao guardados os valores das, e os set's sao funções que atualizam os valores guardados*/
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState('');
  const [erro, setErro] = useState('');

  /*função para calcular o imc, e o replace transforma , em . poruqe javascrispt só entende ponto(quase igual ao casting se nao for)*/
  function calcularIMC() {
    const pesoNum = parseFloat(peso.replace(',', '.'));
    const alturaNum = parseFloat(altura.replace(',', '.'));

  /*verifica se sao numeros caso nao seja retorna a mensagem de erro */
    if (isNaN(pesoNum) || isNaN(alturaNum) || pesoNum <= 0 || alturaNum <= 0) {
      setErro('Por Favor Digite Valores Numerais!');
      setResultado('');
      return;
    }

    /*calcula o imc com a formula e o let ja prepara as classficações para retornar*/
    const imc = pesoNum / (alturaNum * alturaNum);
    let classificacao = '';

    /*classififcações*/
    if (imc < 18.5) classificacao = 'Abaixo do peso';
    else if (imc < 25) classificacao = 'Peso normal';
    else if (imc < 30) classificacao = 'Sobrepeso';
    else if (imc < 35) classificacao = 'Obesidade grau I';
    else if (imc < 40) classificacao = 'Obesidade grau II';
    else classificacao = 'Obesidade grau III';

    /*set erro apaga o erro anterior se tiver algo errado, e retorna a classificação e o valor com apenas 2 casas decimais*/
    setErro('');
    setResultado(`IMC: ${imc.toFixed(2)} - ${classificacao}`);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cálculo de IMC</Text>
    
      <TextInput
        style={styles.input}
        placeholder="Digite seu Peso (kg)"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua Altura (m)"
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
      />

      <TouchableOpacity style={styles.botao} onPress={calcularIMC}>
        <Text style={styles.textoBotao}>Calcular</Text>
      </TouchableOpacity>

      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}
      {resultado !== '' && <Text style={styles.resultado}>{resultado}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A2239',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  titulo: {
    fontSize: 32,
    color: '#F1F1F1',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 14
  },
  botao: {
    backgroundColor: '#3FFFA8',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5
  },
  textoBotao: {
    color: '#0A2239',
    fontWeight: 'bold',
    fontSize: 16
  },
  erro: {
    color: '#FFFFFF',
    backgroundColor: '#FF6B6B',
    padding: 12,
    marginTop: 15,
    borderRadius: 6,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  resultado: {
    color: '#FFFFFF',
    backgroundColor: '#23A6D5',
    padding: 18,
    marginTop: 20,
    borderRadius: 8,
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});



