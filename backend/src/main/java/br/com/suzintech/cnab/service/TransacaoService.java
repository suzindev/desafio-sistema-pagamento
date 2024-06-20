package br.com.suzintech.cnab.service;

import br.com.suzintech.cnab.entity.TipoTransacao;
import br.com.suzintech.cnab.entity.TransacaoReport;
import br.com.suzintech.cnab.repository.TransacaoRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

@Service
public class TransacaoService {

    private final TransacaoRepository transacaoRepository;

    public TransacaoService(TransacaoRepository transacaoRepository) {
        this.transacaoRepository = transacaoRepository;
    }

    public List<TransacaoReport> listTotaisTransacoesPorNomeDaLojas() {
        var transacoes = transacaoRepository.findAllByOrderByNomeDaLojaAscIdDesc();
        var reportMap = new LinkedHashMap<String, TransacaoReport>();

        transacoes.forEach(transacao -> {
            String nomeDaLoja = transacao.nomeDaLoja();
            var tipoTransacao = TipoTransacao.findByTipo(transacao.tipo());
            BigDecimal valor = transacao.valor().multiply(tipoTransacao.getSinal());

            reportMap.compute(nomeDaLoja, (key, existingReport) -> {
                var report = (existingReport != null) ? existingReport :
                        new TransacaoReport(key, BigDecimal.ZERO, new ArrayList<>());

                return report
                        .addTotal(valor)
                        .addTransacao(transacao.withValor(valor));
            });
        });

        return new ArrayList<>(reportMap.values());
    }
}
