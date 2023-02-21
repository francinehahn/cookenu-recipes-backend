import { connection } from "./connection"


const createTables = () => connection.raw(`

    CREATE TABLE IF NOT EXISTS cookenu_users (
        id CHAR(36) NOT NULL PRIMARY KEY,
        email VARCHAR(100) NOT NULL UNIQUE,
        name VARCHAR(100) NOT NULL,
        password VARCHAR(200) NOT NULL,
        role ENUM("NORMAL", "ADMIN") DEFAULT "NORMAL"
    );

    CREATE TABLE IF NOT EXISTS cookenu_recipes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        description TEXT NOT NULL,
        created_at DATE NOT NULL,
        fk_user_id CHAR(36) NOT NULL,
        FOREIGN KEY(fk_user_id) REFERENCES cookenu_users(id)
    );

    CREATE TABLE IF NOT EXISTS cookenu_followers (
        id CHAR(36) NOT NULL PRIMARY KEY,
        fk_user_id CHAR(36) NOT NULL,
        fk_follower_id CHAR(36) NOT NULL,
        FOREIGN KEY(fk_user_id) REFERENCES cookenu_users(id),
        FOREIGN KEY(fk_follower_id) REFERENCES cookenu_users(id)
    );

`).then(() => console.log("Tabelas criadas.")).catch(err => console.log(err.message))


const insertValues = () => connection.raw(`

    INSERT INTO cookenu_users VALUES
    ("sd4iu-6r84cd-askjbdaj-564sd46ad-kjsd", "fran_hahn@hotmail.com", "Francine Hahn", "123456", "NORMAL"),
    ("987DF-500Zg5A-8gud9-ssds-k65ZSA-HS5A", "mariasilva@gmail.com", "Maria Silva", "123456", "ADMIN"),
    ("sf563-kufq7A-H56k8-qw86a-se6f44-gjl5", "luanbastos@gmail.com", "Luan Bastos", "123456", "NORMAL");

    INSERT INTO cookenu_recipes VALUES
    (1, "Bolo de chocolate com cobertura de chocolate", "INGREDIENTES DA MASSA: 4 ovos, 4 colheres (sopa) de chocolate em pó, 2 colheres (sopa) de manteiga, 3 xícaras (chá) de farinha de trigo, 2 xícaras (chá) de açúcar, 2 colheres (sopa) de fermento, 1 xícara (chá) de leite. INGREDIENTES DA CALDA: 2 colheres (sopa) de manteiga, 7 colheres (sopa) de chocolate em pó, 2 latas de creme de leite com soro, 3 colheres (sopa) de açúcar. MODO DE PREPARO DA MASSA: Em um liquidificador adicione os ovos, o chocolate em pó, a manteiga, a farinha de trigo, o açúcar e o leite,depois bata por 5 minutos. Adicione o fermento e misture com uma espátula delicadamente. Em uma forma untada, despeje a massa e asse em forno médio (180 ºC) preaquecido por cerca de 40 minutos. Não se esqueça de usar uma forma alta para essa receita: como leva duas colheres de fermento, ela cresce bastante! Outra solução pode ser colocar apenas uma colher de fermento e manter a sua receita em uma forma pequena. MODO DE PREPARO DA CALDA: Em uma panela, aqueça a manteiga e misture o chocolate em pó até que esteja homogêneo. Acrescente o creme de leite e misture bem até obter uma consistência cremosa. Desligue o fogo e acrescente o açúcar.", "2023-02-09", "sd4iu-6r84cd-askjbdaj-564sd46ad-kjsd"),
    (2, "Empadão de frango", "INGREDIENTES DA MASSA: 400 g de farinha de trigo, 200 g de manteiga gelada, 1 ovo inteiro, 1 gema de ovo batido para a massa, sal a gosto, 6 colheres (sopa) de leite, 1 gema de ovo para pincelar sobre a massa. INGREDIENTES DO RECHEIO: 1 kg de peito de frango desossado, 1 cebola média picadinha, 2 dentes de alho picados e amassados, 1 tomate picado sem pele, 1 colher de sopa de azeite, cheiro-verde picado, 1 lata de milho verde, 1 lata de molho de tomate, 1 colher (sopa) cheia de farinha de trigo, 3 cubos de caldo de galinha, azeitonas picadas. MODO DE PREPARO DA MASSA: Em uma tigela, misture o trigo e a manteiga até obter uma farofa. Acrescente os demais ingredientes e amasse bem até obter uma massa lisa. Embrulhe em papel filme e leve à geladeira por aproximadamente 30 minutos. Use metade da massa para forrar a assadeira e a outra para cobrir o recheio. Pincele o empadão com a gema e leve ao forno médio (180° C), preaquecido, por aproximadamente 40 minutos. MODO DE PREPARO DO RECHEIO: Cozinhe o peito de frango, desfie e reserve. Em uma panela, coloque o azeite, frite a cebola e deixe dourar. Adicione o alho, frite por mais alguns minutos e acrescente o frango desfiado. Dissolva os cubinhos de caldo de galinha na água quente e junte ao refogado. Acrescente o trigo e mexa sem parar, vigorosamente, até obter uma consistência cremosa. Despeje o milho, as azeitonas, o cheiro-verde, o tomate e misture.", "2023-02-09", "sd4iu-6r84cd-askjbdaj-564sd46ad-kjsd"),
    (3, "Cookie de chocolate tradicional", "INGREDIENTES: 2 xícaras de farinha de trigo, 3/4 xícara de açúcar mascavo, 3/4 xícara de açúcar cristal (se não gostar de coisas muito doces pode colocar menos), 2 ovos grandes (se forem pequenos 3), 2 colheres (sopa) de margarina, 1 colher (sobremesa) de fermento em pó, 1 colher (sobremesa) de essência de baunilha, 1 pitada de sal, 1 barra de chocolate meio amargo de 170 g, 1 barra de chocolate ao leite de 170 g. MODO DE PREPARO: Corte e reserve separadamente o chocolate meio amargo e o chocolate ao leite em cubos. Em uma tigela (de batedeira) bata o ovo, o açúcar e a margarina, até virar uma mistura homogênea. Acrescente a farinha de trigo, o açúcar mascavo, o açúcar cristal, a essência de baunilha e o sal. Bata o suficiente até virar uma massa homogênea e meio durinha (cerca de 3 minutos). Coloque dentro dessa massa, os cubinho de chocolate meio amargo e bata pouco, apenas para misturar, até que eles escondam dentro da massa. Coloque o fermento por último e misture o menos possível, pois quanto mais bate, mais ele perde seu efeito. Unte uma forma e com uma colher faça bolinhas com a massa na forma. Tente deixar uma boa distância entre eles e não os faça muito finos, tente sempre fazer um pouco altinho pois no momento em que assa, ele se estica para os lados. Leve para assar em fogo médio, por uns 5 minutos e espete com um garfo umas três vezes para ver se está bom, ele provavelmente sairá sujo pois o chocolate derreterá, fique atento à massa, ela tem que estar fofinha e não mole. Quando retirar as formas ainda quentes, coloque alguns cubos de chocolate ao leite em cima dos cookies para que eles derretam.", "2023-02-10", "sf563-kufq7A-H56k8-qw86a-se6f44-gjl5"),
    (4, "Pão de queijo", "INGREDIENTES: 800 g de polvilho azedo, 1 xícara de água, 1 xícara de leite, 1/2 xícara de óleo, 2 ovos, 100 g de queijo parmesão ralado, sal a gosto. MODO DE PREPARO: Em uma panela, ferva a água e acrescente o leite, o óleo e o sal. Adicione o polvilho aos poucos até dar liga. Pode ser que você não precise usar os 800g, então coloque devagar e sove a massa até soltar da mão: esse é o ponto. Quando a massa estiver morna, acrescente o queijo parmesão, os ovos e misture bem. Unte as mãos e enrole bolinhas de 2 cm de diâmetro. Disponha as bolinhas em uma assadeira untada com óleo, deixando um espaço entre elas. Asse em forno médio (180º C), preaquecido, por cerca de 40 minutos.", "2023-02-11", "sf563-kufq7A-H56k8-qw86a-se6f44-gjl5");

`).then(() => {
    console.log("Valores inseridos.")
    connection.destroy()
}).catch(err => console.log(err.message))


createTables().then(insertValues)