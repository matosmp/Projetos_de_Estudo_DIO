
public class ContaPoupanca extends Conta {

	public ContaPoupanca(Cliente cliente) {
		super(cliente);
		
	}

	@Override
	public void imprimirExtrato() {
		System.out.println("Extrato Conta Poupança");
		System.out.println(String.format("Titular:  %s",super.cliente.getNome()));
		System.out.println(String.format("Conta:  %d",super.numero));
		System.out.println(String.format("Agencia:  %d",super.agencia));
		System.out.println(String.format("Saldo:  %f",super.saldo));
		
	}
	
	
	
}
