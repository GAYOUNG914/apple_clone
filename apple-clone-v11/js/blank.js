(()=>{


    let yOffset = 0; // window.pageOffset 대신 쓸 수 있는 변수
    let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0; // 현재 활성화된(눈 앞에 보이고 있는) scene(scroll-seciton)
    let enterNewScene = false; //새로운 씬이 시작되는 순간 true

    const sceneInfo = [
        {
            //0
            type: 'sticky',
            heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs:{//html 요소 모아두기
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0 .main-message.a'),
                messageB: document.querySelector('#scroll-section-0 .main-message.b'),
                messageC: document.querySelector('#scroll-section-0 .main-message.c'),
                messageD: document.querySelector('#scroll-section-0 .main-message.d'),
            },
            values:{ //시점, 불투명도 조작
                messageA_opacity: [0, 1, { start: 0.1, end: 0.2 }],
                messageB_opacity: [0, 1, { start: 0.3, end: 0.4 }],
            }
        },
        {
            //1
            type: 'normal',
            heightNum: 5,
            scrollHeight: 0,
            objs:{//html 요소 모아두기
                container: document.querySelector('#scroll-section-1'),
                
            }
        },
        {
            //2
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs:{//html 요소 모아두기
                container: document.querySelector('#scroll-section-2')
            }
        },
        {
            //3
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs:{//html 요소 모아두기
                container: document.querySelector('#scroll-section-3')
            }
        },

    ];

    function setLayout(){
        //각 스크롤 섹션의 높이 세팅
        for(let i = 0; i < sceneInfo.length; i++){
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }
        // console.log(sceneInfo)
    }

    function calcValues(values, currentYOffset){
        let rv;
        //현재 씬(스크롤섹션)에서 스크롤된 범위 비율로 구하기
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;

        if(values.length === 3 ){
            //섹션 안의 특정 구간에서 인터랙션이 있어야 하는 경우(start ~ end 사이에 애니메이션 실행)
            //아니 이걸 어케 생각하셨지 후...
            //우왕... 그림그려서 생각하면 쉬울 수도 있겠네.. 후...후후호호후후..ㅠㅠ
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd= values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;

            rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];


        }else{
            rv = scrollRatio * (values[1] - values[0]) + values[0];
        }

        return rv;

    }

    function playAnimation() {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;

        // console.log(currentYOffset);
        switch (currentScene){
            case 0:
                let messageA_opacity_in = calcValues(values.messageA_opacity, currentYOffset);
                objs.messageA.style.opacity = messageA_opacity_in;
                console.log(objs.messageA.style.opacity)
                break;

            case 1:
                console.log('111', currentYOffset);

                break;
            case 2:
                console.log('3333')

                break;
            case 3:
                console.log('44')

                break;
        }
    }

    function scrollLoop(){
        enterNewScene = false;

        prevScrollHeight = 0;//스크롤이벤트 일어날 때 마다 누적이 안되게끔 초기화
        for(let i = 0; i < currentScene; i++){
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        //currentScene 정해주기! 와! 어케 이런 생각을!
        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            enterNewScene = true;
            currentScene++;
        document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if(yOffset < prevScrollHeight){
            if(currentScene === 0 ) return;
            enterNewScene = true;
            currentScene--;
        document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if (enterNewScene) return;//이상한 값 들어갈 때 return되면서 playAnimation()이 한 턴 걸러짐
        playAnimation();

    }

    window.addEventListener('scroll',()=>{
        yOffset = window.pageYOffset;
        scrollLoop();
    });

    window.addEventListener('load',setLayout);
    window.addEventListener('resize',setLayout);

})();