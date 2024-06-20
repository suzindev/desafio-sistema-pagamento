package br.com.suzintech.cnab.web;

import br.com.suzintech.cnab.entity.TransacaoReport;
import br.com.suzintech.cnab.service.TransacaoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("transacoes")
public class TransacaoController {

    private final TransacaoService transacaoService;

    public TransacaoController(TransacaoService transacaoService) {
        this.transacaoService = transacaoService;
    }

    @GetMapping
    List<TransacaoReport> listAll() {
        return transacaoService.listTotaisTransacoesPorNomeDaLojas();
    }
}
