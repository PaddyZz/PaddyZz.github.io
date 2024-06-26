(function() {
    var isNight = localStorage.getItem('night');
    var isStar = localStorage.getItem('star');
    var nightNav;
    var starNav;
    var canvaNav;
    var disqusNav;
    var layoutDisqusSign = false;
    

    function checkLayoutDisqus(index) {
        if (index < 3) {
            index = index + 1;
        }
        if (disqusNav !== null) {
            layoutDisqusSign = true;
        }else{
            if (index < 3) {
                setTimeout(() => checkLayoutDisqus(index), 200);
            }
            
        }
    }

    function disqusStyleApplyNight(){
        if(layoutDisqusSign) {
            if (disqusNav !== null) {
                
                disqusNav.style.background = 'rgb(27, 31, 45)';
                if (typeof window.DISQUS !== "undefined")
                {
                    window.DISQUS.reset({ reload: true });
                }
                
            } else {
                setTimeout(disqusStyleApplyNight, 200);
            }
        }
    }

    function disqusStyleRemoveNight(){

        if(layoutDisqusSign) {
            
            if (disqusNav !== null) {
                disqusNav.style.background = 'transparent';
                if (typeof window.DISQUS !== "undefined")
                {
                    window.DISQUS.reset({ reload: true });
                }
            } else {
                setTimeout(disqusStyleRemoveNight, 200);
            }
        }
    }
   
  
    function applyNight(value) {
        if (value.toString() === 'true') { 
            document.body.classList.add('night');

            if (nightNav != null)
                nightNav.title = 'Lumos!';
            if (starNav != null) {
                starNav.style.opacity = '1';
                starNav.style.display = 'flex';
                starNav.style.userSelect = 'text';
            }
            disqusStyleApplyNight();
            setTimeout(disqusChangeStyle,200);
           
        } else {
            document.body.classList.remove('night');
            isNight = false;
            
            if (canvaNav != null) 
                canvaNav.style.display = 'none';
            if (nightNav != null)
                nightNav.title = 'Nox!';
            if (starNav != null) {
                starNav.style.opacity = '0';
                starNav.style.display = 'none';
                starNav.style.userSelect = 'none';
                if (starNav.classList.contains('star')) {
                    starNav.classList.remove('star');
                    localStorage.removeItem('star', isStar);
                    isStar = false;
                }
            }
            disqusStyleRemoveNight();
            
        }
    }

    function disqusChangeStyle() {
        if (layoutDisqusSign) {
            if (disqusNav !== null && typeof window.DISQUS !== "undefined") {
                disqusNav.style.background = 'rgba(40,44,52,0.1)';
                disqusStyleSign = true;
            } else {
                setTimeout(disqusChangeStyle, 200);
            }
        }
    }

    function applyStar(value_night, value_star) {
        if (value_night.toString() === 'true') { 
            
            if (value_star.toString() === 'true') { 
                canvaNav.style.display = 'block';
                starNav.classList.add('star');
                starNav.style.opacity = '0.5';
                starNav.title= 'Nox Revocatio!'; 

                disqusChangeStyle();
            } else {
                starNav.classList.remove('star');
                starNav.style.opacity = '1';
                starNav.title= 'Nox Tenebratio!';
            }
        }
    }
  
    function findNightNav() {
        var index = 0;
        nightNav = document.getElementById('night-nav');
        starNav = document.getElementById('star-nav');
        canvaNav = document.getElementById('universe');
        disqusNav = document.getElementById('disqus_thread');

        if (nightNav && starNav && canvaNav) {
            nightNav.addEventListener('click', switchNight);
            starNav.addEventListener('click', switchStar);
            isStar && applyStar(isNight,isStar);
            checkLayoutDisqus(index);
            if (isNight) {
                starNav.style.opacity = '1';
                starNav.style.display = 'flex';
               
                starNav.style.userSelect = 'text';
                nightNav.title = 'Lumos!';                
            }
            
        } else {
            setTimeout(findNightNav, 100);
        }

    }
   
    function switchStar() {
        isStar = isStar ? isStar.toString() !== 'true' : true; 
        applyStar(isNight, isStar);
        localStorage.setItem('star', isStar);
    }

    function switchNight() {
        isNight = isNight ? isNight.toString() !== 'true' : true; 
        applyNight(isNight);
        localStorage.setItem('night', isNight);
        
    }
  
    findNightNav();
    isNight && applyNight(isNight);
    
}());
  

