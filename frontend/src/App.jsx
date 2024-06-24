import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [file, setFile] = useState(null);

  const fetchTransactions = async () => {
    const response = await axios.get("http://localhost:8080/transacoes");
    setTransactions(response.data);
    console.log(response.data);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", file);
    await axios.post("http://localhost:8080/cnab/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    fetchTransactions();
  };

  const calcularTotalPorLoja = (transacoes) => {
    let total = 0;
    transacoes.forEach((transacao) => {
      total += transacao.valor;
    });
    return total.toFixed(2);
  };

  const corDoTotal = (total) => {
    return total >= 0 ? "text-green-600" : "text-red-600";
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="mb-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Importação de CNAB</h1>
      </div>

      <div className="mb-8 flex flex-col items-center">
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Choose File
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".txt"
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={uploadFile}
          className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        >
          Upload File
        </button>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Transações</h2>
        <ul className="space-y-4">
          {transactions.map((report, reportIdx) => (
            <li key={reportIdx} className="bg-white p-4 shadow rounded">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-base font-semibold italic mb-2">
                  {report.nomeDaLoja}
                </h3>
                <span
                  className={`text-lg font-semibold ${corDoTotal(
                    calcularTotalPorLoja(report.transacoes)
                  )}`}
                >
                  Total: R$ {calcularTotalPorLoja(report.transacoes)}
                </span>
              </div>
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="px-2 py-1 text-center">Cartão</th>
                    <th className="px-2 py-1 text-center">CPF</th>
                    <th className="px-2 py-1 text-center">Data</th>
                    <th className="px-2 py-1 text-center">Dono da Loja</th>
                    <th className="px-2 py-1 text-center">Hora</th>
                    <th className="px-2 py-1 text-center">Nome da Loja</th>
                    <th className="px-2 py-1 text-center">Tipo</th>
                    <th className="px-2 py-1 text-center">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {report.transacoes.map((transacao, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-gray-100" : "bg-white"}
                    >
                      <td className="px-2 py-1 text-center">
                        {transacao.cartao}
                      </td>
                      <td className="px-2 py-1 text-center">{transacao.cpf}</td>
                      <td className="px-2 py-1 text-center">
                        {transacao.data}
                      </td>
                      <td className="px-2 py-1 text-center">
                        {transacao.donoDaLoja}
                      </td>
                      <td className="px-2 py-1 text-center">
                        {transacao.hora}
                      </td>
                      <td className="px-2 py-1 text-center">
                        {transacao.nomeDaLoja}
                      </td>
                      <td className="px-2 py-1 text-center">
                        {transacao.tipo}
                      </td>
                      <td className="px-2 py-1 text-center">
                        {transacao.valor}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
