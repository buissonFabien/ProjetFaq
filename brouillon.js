'<div ng-controller="getInfoCtrl as app" id= "globalDiv">
        
        <div id="search-box">
          <form id="search-form" ng-show="affFormSearch">
            <div class="searchBox">
              <input id="search-text" type="text" ng-model="textSearch" placeholder="Une question ... ?" required/>
              <button id=\'search-button\' ng-click="tfidf(textSearch)">Search</button>
            </div>
          </form> 
        </div>



        <div id="result">
          <ul class="searchResult" >
            <li ng-show="afficheResSearch" ng-repeat= "questionSearch in tabFinalPoids | orderBy: \'-weight\' | unique: \'title\' ">
              <a  href="#" class="question" ng-click="setSelectedQuestionSearch(questionSearch)">{{questionSearch.title}}</a>
              <a href="#" class="questionViews" ng-click="setSelectedQuestionSearch(questionSearch)"> Vu {{questionSearch.nbViews}} fois</a>

            </li>
          </ul>
          
          <ul id="catArti">
            <li  ng-hide="afficheQuestion" ng-if="catSelected != null" 
                ng-repeat="question in tab | filter: {categorie :catSelected} |orderBy: \'-nbViews\'">
              <a ng-show= "aff" href="#" class="question" ng-click="setSelectedQuestion(question)">{{question.title}}
              </a>
              <a ng-show= "aff" href="#" class="questionViews" ng-click="setSelectedQuestion(question)">Vu {{question.nbViews}} fois</a>
            </li>
            <p ng-hide="!indice" class="answer">{{selectedQuestion.answer}}</p>       
            <p ng-show="!afficheRepSearch" class="answer">{{selectedQuestionSearch.answer}}</p>

            <!-- <p ng-show="!affViewsSearch" class="views">Cet article a été consulté {{selectedQuestionSearch.nbViews}} fois</p> -->
            <!-- <button ng-show="!affViewsSearch" class="views" ng-click="noReply(textSearch)">Pas de réponse ?</button> -->
            <p ng-hide="!pop" class="answer">{{selectedQuestionPop.answer}}</p> 
            <p class="views" ng-show="!affViewsPop">Cet article a été consulté {{selectedQuestionPop.nbViews}} fois</p> 
            <div ng-show="!affNoReply">
              <p class="usefulAnswer">Cette réponse vous a était utile ?</p>
              <button class="views" ng-click="usefulAnswer()">Oui</button>
              <button class="views" ng-click="formContact()"> Non</button>
              <div ng-show="!affForm">
                <form id="formContact">
                  <p>Contactez-nous</p>
                  <label>Titre de la demande: </label>
                  <input id="titleContact" type="text" ng-model="textSearch" required/>
                  <label>Corps de la demande: </label>
                  <textarea id="corpContact" type="text"></textarea>
                  <label>Nom: </label>
                  <input id="nameContact" type="text">
                  <label>Email: </label>
                  <input id="mailContact" type="text">
                  <br>
                  <button class="views" id=\'submitContact\' ng-click="submitContactForm(); textSearch=\'\'; " >Envoyer</button>
                </form>
                <button class="views" ng-click="returnFAQ(); textSearch=\'\';"> Retour à la F.A.Q.</button>
              </div>
                </div>
          </ul>
        </div>

      <!-- cat -->

        <div id="topic">
          <div id="category"><h3 class="catTitle">Catégories</h3></div> 
          <div>
            <ul class="rubrique">
              <div class="categoryBlock" ng-repeat= "cat in tab | unique: \'categorie\'" ng-if="cat.categorie != null" >
                <a class="catLink" href="#" ng-click="setSelectedCat(cat)" >
                  <div class="category"><p>{{cat.categorie}}</p></div>
                </a>
              </div>
            </ul>
          </div>
        </div> 

        <!-- Popular box -->
        <div id="importantBox">
          <div id="popArticle"> <h3 class="titlePop">Sujets importants</h3> </div>
          <ul class="pop">
            <li ng-repeat= "article in tab | filter: {popular:\'1\'}">
              <a href="#" class="question" ng-click="setSelectedQuestionPop(article)">
                <p>{{article.title}}</p>
              </a>
            </li>         
          </ul>
        </div> 

      <!-- Didactitiel de la FAQ -->
        <div id="tutorial"> 
          <h3 class="tutoTitle">Comment fonctionne la F.A.Q. ?</h3>
          <div class="step">
            <h4 class="stepTitle">Entrez</h4>
            <p class="stepParaph">une phrase ou des mots-clefs</p>
          </div>
          <img src="css/arrow.jpg">
          <div class="step">
            <h4 class="stepTitle">Trouvez</h4>
            <p class="stepParaph"> la réponse et indiquez si elle est utile</p> 
          </div>
          <img src="css/arrow.jpg">

          <div class="step">
            <h4 class="stepTitle">Contactez</h4>
            <p class="stepParaph"> l\'assistance si la FAQ ne peut vous aider </p> 

          </div>
        </div>
 
      </div>  '