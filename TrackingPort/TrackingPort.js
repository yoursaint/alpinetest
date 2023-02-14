const { spawn } = require('child_process');

// iptables에 대한 로그 파일을 지정한 시간 동안 읽고, 특정 포트에 대한 로그를 추출하는 함수
function startIptablesLogWatcher(duration, port) {
    const logFile = '/var/log/messages';

    // coreutils 패키지 설치 명령어
    const installCoreutilsCmd = 'apk add coreutils';

    // timeout 명령어를 사용하여 지정한 시간 동안 로그 파일을 읽는 명령어
    const allPortsCmd = `tail -f ${logFile} | grep "iptables: IN=" | grep "DPT=" | timeout ${duration}`;
    const portCmd = `tail -f ${logFile} | grep "iptables: IN=" | grep "DPT=${port}" | timeout ${duration}`;

    // coreutils 패키지 설치
    const installCoreutils = spawn('sh', ['-c', installCoreutilsCmd]);
    installCoreutils.on('exit', () => {
        // 전체 포트 접속 로그 파일을 지정한 시간 동안 읽고, 추출된 로그를 출력하는 이벤트 리스너
        const allPortsStream = spawn('sh', ['-c', allPortsCmd]);
        allPortsStream.stdout.on('data', (data) => {
            const logText = data.toString();
            console.log(`All ports: ${logText}`);
        });

        // 특정 포트 접속 로그 파일을 지정한 시간 동안 읽고, 추출된 로그를 출력하는 이벤트 리스너
        const portStream = spawn('sh', ['-c', portCmd]);
        portStream.stdout.on('data', (data) => {
            const logText = data.toString();
            console.log(`Port ${port}: ${logText}`);
        });
    });
}
