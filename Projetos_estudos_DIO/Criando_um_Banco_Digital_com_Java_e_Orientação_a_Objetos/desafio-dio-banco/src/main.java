
public class main {

	public static void main(String[] args) {
		Cliente fernando = new Cliente();
		fernando.setNome("Fernando");
		
		ContaCorrente contaCorrente = new ContaCorrente(fernando);
		ContaPoupanca contaPoupanca = new ContaPoupanca(fernando);

		contaCorrente.imprimirExtrato();
		contaPoupanca.imprimirExtrato();
	}

}
