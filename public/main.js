
//AJAX获取并相应html文件
getHTML.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '3.html')
    request.onload = () => {
        console.log('request.response')
        console.log(request.response)
        // 上面一句是调试
        // 
        const div = document.createElement('div')
        div.innerHTML = request.response
        document.body.appendChild(div)
    }
    request.onerror = () => {
        console.log('请求失败')
    }
    request.send()
}

//AJAX获取并响应CSS文件
//利用ajax原理想style.css写入 html里面并正确响应
getCSS.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', 'style.css')
    request.onreadystatechange = () => {
        //此时下载完成，但是不是知道是下载成功：200（2xx）下载失败300（3xx）
        if (request.readyState === 4) {
            // 4代表下载完成
            if (request.status >= 200 && request.status < 300) {
                //status 表示状态 200<=状态码<300表示下载成功 
                console.log(request.response)
                //创建style标签
                const style = document.createElement('style')
                //填写style内容
                style.innerHTML = request.response
                //将style插入html里面的head里面
                document.head.appendChild(style)
            } else {
                alert('加载CSS失败')
            }
        }
    }
    request.send()
}
//AJAX获取并响应js文件
getJS.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '2.js')
    request.onload = () => {
        console.log('request.response')
        console.log(request.response)
        // 调试

        //添加script标签
        const script = document.createElement('script')
        //书写script标签内容
        script.innerHTML = request.response
        //将script加入到body里面
        document.body.appendChild(script)

    }
    request.onerror = () => {
        console.log('请求失败')
    }
    request.send()
}
getXML.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '4.xml')
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            //下载完成
            if (request.status >= 200 && request.status < 300) {
                //下载成功
                console.log(request.response)
                const dom = request.responseXML
                const text = dom.getElementsByTagName('warning')[0].textContent
                //text 是一个数组
                console.log(text.trim())
            }
        }
    }
    request.send()
}

getJSON.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '/5.json')
    request.onreadystatechange = () => {
        if (request.readyState == 4) {
            if (request.status >= 200 && request.status < 300) {
                console.log(request.response)
                const object = JSON.parse(request.response)
                //JSON.parse()会把（）里转换成JSON中相应的数据类型
                myName.textContent = object.name
                //将html里id为myName的文本内容改为object.name
                console.log(object)
            }
        }
    }
    request.send()
}

let n = 1
getPage.onclick = () => {
    if (n < 3) {
        const request = new XMLHttpRequest()
        request.open('GET', `/page${n + 1}`)
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status >= 200 && request.status < 300) {
                    console.log(request.response)
                    const array = JSON.parse(request.response)
                    array.forEach(item => {
                        const li = document.createElement("li")
                        li.textContent = item.id
                        xxx.appendChild(li)
                    })
                    n += 1
                }
            }
        }
        request.send()
    } else {
        alert('最后一页')
    }
}