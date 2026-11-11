document.addEventListener('DOMContentLoaded', () => {
    // 1. Menu Mobile e Links Ativos
    const navToggle = document.getElementById('navToggle');
    const siteNav = document.getElementById('siteNav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && siteNav) {
        navToggle.addEventListener('click', () => {
            siteNav.classList.toggle('open');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
            if (siteNav) siteNav.classList.remove('open');
        });
    });

    // 2. Abas Interativas do Cardápio + Troca Dinâmica de Foto
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuPanels = document.querySelectorAll('.menu-panel');
    const frameImg = document.querySelector('.menu-frame img');
    const frameTitle = document.querySelector('.frame-caption span');
    const frameDesc = document.querySelector('.frame-caption p');

    // Fotos e legendas exclusivas para cada aba
    const dadosAbas = {
        'bovinos': {
            img: 'carne-garfo.jpg',
            titulo: 'PONTO DO ASSADOR',
            texto: 'Todos os espetos bovinos são assados na hora sobre carvão vegetal selecionado.'
        },
        'aves-suinos': {
            img: 'banner-picanha.jpg',
            titulo: 'TEMPERO ARTESANAL',
            texto: 'Cortes suculentos preparados com marinada exclusiva da casa e fogo controlado.'
        },
        'especiais': {
            img: 'jantinha.jpg',
            titulo: 'ACOMPANHAMENTOS COMPLETOS',
            texto: 'Espetos especiais, queijo coalho dourado e nossa tradicional jantinha servida quente.'
        }
    };

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove estado ativo de todos
            tabBtns.forEach(b => b.classList.remove('active'));
            menuPanels.forEach(p => p.classList.remove('active'));

            // Ativa o botão clicado e o painel correspondente
            btn.classList.add('active');
            const alvo = btn.getAttribute('data-target');
            const painelAlvo = document.getElementById(alvo);
            
            if (painelAlvo) {
                painelAlvo.classList.add('active');
            }

            // Atualiza a foto e legenda da moldura lateral
            if (frameImg && dadosAbas[alvo]) {
                frameImg.style.opacity = '0.4';
                setTimeout(() => {
                    frameImg.src = dadosAbas[alvo].img;
                    if (frameTitle) frameTitle.textContent = dadosAbas[alvo].titulo;
                    if (frameDesc) frameDesc.textContent = dadosAbas[alvo].texto;
                    frameImg.style.opacity = '1';
                }, 150);
            }
        });
    });

    // 3. Envio do Formulário para o WhatsApp
    const formContato = document.getElementById('formContato');
    if (formContato) {
        formContato.addEventListener('submit', (e) => {
            e.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const assunto = document.getElementById('assunto').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();

            const numeroWhatsApp = '5545999999999';

            const texto = 
                `Olá! Vim pelo site do *Rapé Espetinhos*.\n\n` +
                `*Nome:* ${nome}\n` +
                `*Telefone:* ${telefone}\n` +
                (assunto ? `*Assunto:* ${assunto}\n` : '') +
                `*Mensagem:* ${mensagem}`;

            window.open(`https://wa.me{numeroWhatsApp}?text=${encodeURIComponent(texto)}`, '_blank');
            formContato.reset();
        });
    }
});
