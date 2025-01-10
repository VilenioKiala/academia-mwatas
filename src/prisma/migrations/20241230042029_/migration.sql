-- CreateIndex
CREATE FULLTEXT INDEX `Curso_titulo_idx` ON `Curso`(`titulo`);

-- CreateIndex
CREATE FULLTEXT INDEX `users_nome_idx` ON `users`(`nome`);

-- CreateIndex
CREATE FULLTEXT INDEX `users_nome_sobrenome_idx` ON `users`(`nome`, `sobrenome`);

-- CreateIndex
CREATE FULLTEXT INDEX `users_nome_sobrenome_nomeUsuario_idx` ON `users`(`nome`, `sobrenome`, `nomeUsuario`);

-- CreateIndex
CREATE FULLTEXT INDEX `VideoAula_titulo_idx` ON `VideoAula`(`titulo`);

-- CreateIndex
CREATE FULLTEXT INDEX `VideoAula_titulo_descricao_idx` ON `VideoAula`(`titulo`, `descricao`);
