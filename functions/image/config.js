const config = {
    'default': {
        font: '"Noto Sans CJK JP"',
        textAlign: 'center'
    },
    '01': {
        fillStyle: 'rgb(251, 244, 253)'
    },
    '02': {
        fillStyle: 'rgb(0, 0, 0)'
    },
    '03': {
        fillStyle: 'rgb(247, 255, 237)'
    },
    '04': {
        fillStyle: 'rgb(0,0,0)'
    },
    '05': {
        fillStyle: 'rgb(66, 85, 131)'
    },
    '06': {
        fillStyle: 'rgb(243, 236, 241)'
    },
    '07': {
        fillStyle: 'rgb(0, 0, 0))'
    },
    '08': {
        fillStyle: 'rgb(255, 255, 255)'
    },
    '09': {
        fillStyle: 'rgb(0, 0, 0)'
    },
    '010': {
        fillStyle: 'rgb(255, 255, 255)'
    }
}

function getConfig(num) {
    return { ...config.default, ...config[num] };
}

module.exports = {
    getConfig
}