(()=>{


    let yOffset = 0; // window.pageOffset 대신 쓸 수 있는 변수
    let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0; // 현재 활성화된(눈 앞에 보이고 있는) scene(scroll-seciton)

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
                messageA_opacity: [200, 700],
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
        let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;

        rv = parseInt(scrollRatio * (values[1] - values[0]) + values[0]);

        return rv;

    }

    function playAnimation() {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;

        // console.log(currentYOffset);
        switch (currentScene){
            case 0:
                let messageA_opacity_0 = values.messageA_opacity[0];
                let messageA_opacity_1 = values.messageA_opacity[1];

                console.log(calcValues(values.messageA_opacity, currentYOffset));
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
        prevScrollHeight = 0;//스크롤이벤트 일어날 때 마다 누적이 안되게끔 초기화
        for(let i = 0; i < currentScene; i++){
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        //currentScene 정해주기! 와! 어케 이런 생각을!
        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            currentScene++;
        document.body.setAttribute('id', `show-scene-${currentScene}`);

        }

        if(yOffset < prevScrollHeight){
            if(currentScene === 0 ) return;
            currentScene--;
        document.body.setAttribute('id', `show-scene-${currentScene}`);

        }

        playAnimation();

    }

    window.addEventListener('scroll',()=>{
        yOffset = window.pageYOffset;
        scrollLoop();
    });

    window.addEventListener('load',setLayout);
    window.addEventListener('resize',setLayout);

})();