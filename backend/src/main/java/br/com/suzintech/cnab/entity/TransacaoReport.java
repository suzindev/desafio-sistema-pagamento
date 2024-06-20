package br.com.suzintech.cnab.entity;

import java.math.BigDecimal;
import java.util.List;

public record TransacaoReport(
        String nomeDaLoja,
        BigDecimal total,
        List<Transacao> transacoes
) {
    public TransacaoReport addTotal(BigDecimal value) {
        return new TransacaoReport(nomeDaLoja, total.add(value), transacoes);
    }

    public TransacaoReport addTransacao(Transacao transacao) {
        transacoes.add(transacao);

        return new TransacaoReport(nomeDaLoja, total, transacoes);
    }
}
