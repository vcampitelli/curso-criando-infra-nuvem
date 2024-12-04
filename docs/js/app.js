/**
 * Transformando imagens SVG em objetos reais
 */
document.querySelectorAll('img.inject-svg').forEach(($img) => {
    fetch($img.src).then(response => {
        if (!response.ok) {
            return;
        }
        response.text().then(contents => {
            const $wrapper = document.createElement('div');
            $wrapper.classList.add('svg-wrapper');
            if ($img.dataset.id) {
                contents = contents.replace('<svg', '<svg data-id="' + encodeURIComponent($img.dataset.id) + '"');
            }
            $wrapper.innerHTML = contents.replace('<?xml version="1.0" encoding="UTF-8"?>', '');
            $img.parentNode.replaceChild($wrapper, $img);
        });
    });
});

/**
 * Inicializando o Reveal
 */
Reveal.initialize({
    hash: true,
    mouseWheel: false,
    overview: false,
    history: true,
    plugins: [RevealHighlight, RevealNotes],
    slideNumber: 'c/t',
});

/**
 * Steps customizados ao mostrar o pipeline
 */
Reveal.on('fragmenthidden', (event) => {
    const fragments = event.fragments;
    if (typeof fragments[1] === 'undefined') {
        return;
    }
    if (fragments[1].classList.contains('fragment-pipeline-step')) {
        const $li = fragments[1].previousElementSibling;
        if (!$li) {
            return;
        }
        const y = $li.offsetTop - $li.parentNode.offsetTop;
        if (y < $li.parentNode.clientHeight + $li.parentNode.scrollTop) {
            $li.parentNode.scrollTo({
                top: y,
                behavior: 'smooth',
            });
        }
    }
});
Reveal.on('fragmentshown', (event) => {
    const fragments = event.fragments;
    if (typeof fragments[1] === 'undefined') {
        return;
    }
    if (fragments[1].classList.contains('fragment-pipeline-step')) {
        const $li = fragments[1];
        const y = $li.offsetTop - $li.parentNode.offsetTop;
        if (y + $li.clientHeight > $li.parentNode.clientHeight) {
            $li.parentNode.scrollTo({
                top: y,
                behavior: 'smooth',
            });
        }
    }
});

/**
 * Internacionalização dos campos de UI da AWS
 */
const $kbdEn = document.querySelectorAll('kbd[lang="en"]');
const $kbdPt = document.querySelectorAll('kbd[lang="pt"]');
$kbdPt.forEach(($node) => $node.style.display = 'none');
document.getElementById('translations').querySelectorAll('a').forEach(($node) => {
    $node.addEventListener('click', function (e) {
        e.preventDefault();
        const [$kbdThis, $kbdThat] = ($node.getAttribute('href') === '#pt') ? [$kbdPt, $kbdEn] : [$kbdEn, $kbdPt];
        $kbdThis.forEach(($local) => $local.style.display = 'inline');
        $kbdThat.forEach(($local) => $local.style.display = 'none');
    });
});

/**
 * Funcionalidade "Copiar para a área de transferência" em códigos
 */
document.querySelectorAll('code.clipboard').forEach(($code) => {
    const $button = document.createElement('button');
    $button.classList.add('btn-code-clipboard');
    $button.title = 'Clique aqui para copiar esse código para sua área de transferências';
    $button.addEventListener('click', function (e) {
        e.preventDefault();
        navigator.clipboard.writeText(getTextToBeCopied($code)).then(function() {
            $button.classList.add('btn-code-clipboard-copied');
            setTimeout(function() {
                $button.classList.remove('btn-code-clipboard-copied');
            }, 3000);
        }, function(err) {
            alert('Erro ao copiar código: ' + err.message);
        });
    });
    $code.appendChild($button);
});

/**
 *
 * @param {HTMLElement} $code
 * @returns {string}
 */
const getTextToBeCopied = ($code) => {
    // Removendo $ dos scripts shell
    if ($code.classList.contains('language-shell')) {
        let text = '';
        const $span = $code.querySelectorAll('.language-bash');
        $span.forEach(n => text += n.innerText + "\n");
        return text;
    }

    // Vendo código em tableas com data-line-numbers
    if ($code.dataset.lineNumbers) {
        const $lines = $code.querySelectorAll('.hljs-ln-code');
        let text = '';
        $lines.forEach(n => text += n.innerText + "\n");
        return text;
    }

    return $code.innerText;
}
