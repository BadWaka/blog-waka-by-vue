<template>
  <section class="page">

    <!--左边栏-->
    <div class="left">

      <section id="header">
        <!--<div class="avatar"></div>-->
        <!--<div class="job">{{job}}</div>-->
        <div class="job">{{resume.job}}</div>
        <div class="name">{{resume.name}}</div>
      </section>

      <h2 class="h-white">个人信息</h2>
      <section id="baseInfo">
        <div class="age">年龄：{{resume.baseInfo.age}}</div>
        <div class="phone">电话：{{resume.baseInfo.phone}}</div>
        <div class="email">邮箱：{{resume.baseInfo.email}}</div>
        <div class="school">学校：{{resume.baseInfo.school}}</div>
        <div class="education">学历：{{resume.baseInfo.education}}</div>
        <div class="major">专业：{{resume.baseInfo.major}}</div>
        <div class="englishLevel">英语：{{resume.baseInfo.englishLevel}}</div>
        <div class="graduateDate">毕业年份：{{resume.baseInfo.graduateDate}}</div>
        <div class="blogAddress">个人博客：<a target="_blank" :href="resume.baseInfo.blogAddress">{{resume.baseInfo.blogAddress}}</a>
        </div>
        <div class="blogAddress">GitHub：<a target="_blank" :href="resume.baseInfo.GitHub">{{resume.baseInfo.GitHub}}</a>
        </div>
      </section>

      <!--<h2 class="h-white">职业技能</h2>-->
      <!--<section id="vocationalSkill">-->
      <!--&lt;!&ndash;skill item 使用v-for循环&ndash;&gt;-->
      <!--<div class="skill-item" v-for="skill in resume.vocationalSkills">-->
      <!--<div class="name">{{skill.name}}</div>-->
      <!--<mu-linear-progress class="progress" mode="determinate" :value="skill.score" color="#ec407a"/>-->
      <!--</div>-->
      <!--</section>-->

      <h2 class="h-white">职业技能</h2>
      <section id="vocationalSkill">
        <div v-for="vocationalSkill in resume.vocationalSkillsText" class="item">-&nbsp;{{vocationalSkill}}
        </div>
      </section>

    </div>

    <!--右边栏-->
    <div class="right">

      <h2 class="h-blue">工作经验</h2>
      <section class="works">
        <div class="work-item" v-for="workExperience in resume.workExperiences">
          <div class="work-title">
            <div>{{workExperience.company}} | {{workExperience.job}} | {{workExperience.city}}</div>
            <div>{{workExperience.beginTime}} - {{workExperience.endTime}}</div>
          </div>
          <!--项目-->
          <div v-for="(project,index) in workExperience.projects" class="projects">
            <div class="project-name">-&nbsp;{{project.name}}</div>
            <div class="project-intro" v-html="project.intro"></div>
          </div>
        </div>
      </section>

      <h2 class="h-blue">自我评价</h2>
      <section class="self-assessment">
        <div v-for="(assessment,index) in resume.selfAssessments" class="projects">
          <div class="project-name">
            {{assessment}}
          </div>
        </div>
      </section>

      <h2 class="h-blue">个人项目</h2>
      <section class="personal-projects">
        <!--项目-->
        <div class="projects">
          <div class="project-name">-&nbsp;<a href="https://github.com/BadWaka/blog-waka-by-vue">blog-waka-by-vue：</a>
          </div>
          <div class="project-intro">
            个人博客全栈作品。遵循前端工程化和组件化思想，使用Vue2+ES6+MuseUI编写前端代码，使用Sass+PostCSS编写页面样式，使用webpack编译打包，使用Express+MongoDB搭建后台服务，并独立完成linux环境的服务器部署，现已部署至腾讯云。
          </div>
        </div>
        <div v-for="(project,index) in resume.personalProjects" class="projects">
          <div class="project-name">-&nbsp;<a target="_blank"
                                              :href="project.link">{{project.name}}：</a>
            {{project.intro}}
          </div>
        </div>
      </section>

    </div>

  </section>
</template>

<script>
  export default {
    data () {
      return {
        resume: {
          job: '前端开发工程师',
          name: '王 凯',
          // 基本信息
          baseInfo: {
            age: '24',
            phone: '15652912603',
            email: 'waka931124@gmail.com',
            school: '华北电力大学(北京)',
            education: '本科',
            major: '软件工程',
            englishLevel: '大学英语四级',
            graduateDate: '2016年6月',
            blogAddress: 'http://www.badwaka.cn',
            GitHub: 'https://github.com/badwaka'
          },
          // 工作经验
          workExperiences: [{
            company: '正益移动互联科技股份有限公司',
            job: '前端开发工程师',
            city: '北京',
            beginTime: '2015.10',
            endTime: '至今',
            projects: [{
              name: '正益工作',
              intro: '该项目为Zepto.js+Backbone.js+AppCan.js的Hybrid应用，我在完善功能样式后使用Vue.js重构部分项目，优化代码结构，并引入Sass和Gulp.js，代码量减少20%，极大提升维护效率。该项目源代码已被应用在福田汽车、卡斯柯信号、奥凯航空等企业OA应用中。'
            }, {
              name: '正益移动-微信小程序',
              intro: '该项目采用敏捷开发，由我和一名后端开发一周内共同完成。我在此项目中作为小程序的管理员，负责小程序全部的页面设计、前端开发和上线发布。'
            }, {
              name: '其他项目支持',
              intro: '在<b>福田汽车</b>和<b>中国核电POC</b>项目中负责前端开发部分； <b>中电建电建通</b>项目中负责Android端原生模块，华为eSpaceSDK的二次开发；在<b>乌鲁木齐银行雪莲伙伴</b>项目，<b>北京东方雨虹</b>项目中负责前端速度优化和Android原生模块技术支持；开发和维护AppCan Android原生插件'
            }]
          }],
          // 个人项目
          personalProjects: [{
            name: 'movie-website',
            link: 'https://github.com/BadWaka/movie-website',
            intro: 'Jade+Express+MongoDB搭建的简单电影网站'
          }, {
            name: 'waka-wechat-public',
            link: 'https://github.com/BadWaka/waka-wechat-public',
            intro: 'Koa搭建的微信公众号后台服务（开发中）'
          }, {
            name: 'gallery-by-react-waka',
            link: 'https://github.com/BadWaka/gallery-by-react-waka',
            intro: 'React+webpack实现的画廊程序'
          }, {
            name: 'lottery-by-vue',
            link: 'https://github.com/BadWaka/lottery-by-vue',
            intro: 'Vue.js+Materialize实现的简单的抽奖程序'
          }, {
            name: 'WakaPedometer',
            link: 'https://github.com/BadWaka/WakaPedometer',
            intro: 'Android 原生计步器程序'
          }, {
            name: 'SmallDianPing',
            link: 'https://github.com/BadWaka/SmallDianPing',
            intro: 'Android 原生仿美团订餐程序'
          }],
          // 自我评价
          selfAssessments: [
            '- 计算机基础扎实，掌握JavaScript，CSS，熟练使用各种布局，使用过ES6',
            '- 对解决多浏览器兼容问题，前端性能优化有一定的经验，工作中需要兼容各种型号的手机',
            '- 理解前端工程化思想，对构建和持续集成有一定认识，熟悉webpack，了解gulp',
            '- 理解组件化开发思想，有一定的设计和抽象能力，熟悉Vue.js',
            '- 对后端技术和数据库有一定了解，熟悉Node.js，熟悉MongoDB，熟悉Android内置SQLite',
            '- 有移动端开发经验，主要负责公司Hybrid产品的开发和技术支持，有过原生Android开发经验',
            '- 对公司主要产品正益工作有过重构经验',
            '- 学习能力强，能快速上手新技术，同时也能快速熟悉业务',
            '- 关注开源技术，技术视野开阔',
            '- 懂得Android原生技术，在移动端适配及原生能力开发调试有优势',
            '- 能积极融入团队，有集体责任感，热爱健身，能够承受高压力的工作'
          ],
          // 职业技能
          vocationalSkillsText: [
            '掌握HTML、CSS、JS，熟悉ES6',
            'CSS预处理器方面熟悉Sass，了解stylus，使用过PostCSS',
            '类库方面掌握jQuery、Vue.js、微信小程序MINA、AppCan.js(类Ionic的Hybrid框架)，熟悉Bootstrap、Backbone.js、React，了解Angular2、React Native',
            '构建工具方面熟悉webpack，了解Gulp.js；熟悉前端工程化和组件化开发',
            '有后端开发经历，主要使用Node.js、MongoDB，类库方面熟悉Express，了解koa/koa2；工具方面熟练使用npm，使用过Yarn',
            '有Android原生开发经历，熟悉Java、Android SDK及Android调试工具使用',
            '日常开发使用macOS，Webstorm，Android Studio，Git，熟悉linux命令',
            '英语4级，阅读英文文档基本无障碍'
          ],
          vocationalSkills: [{
            name: 'HTML',
            score: 80
          }, {
            name: 'CSS',
            score: 60
          }, {
            name: 'JavaScript',
            score: 65
          }, {
            name: 'ES6/7',
            score: 20
          }, {
            name: 'jQuery',
            score: 50
          }, {
            name: 'Bootstrap',
            score: 20
          }, {
            name: 'Backbone',
            score: 20
          }, {
            name: 'Vue/Vue2',
            score: 70
          }, {
            name: 'React',
            score: 30
          }, {
            name: 'Angular2',
            score: 10
          }, {
            name: '微信小程序',
            score: 70
          }, {
            name: 'AppCan.js',
            score: 80
          }, {
            name: 'Node.js',
            score: 50
          }, {
            name: 'Express',
            score: 40
          }, {
            name: 'Koa/Koa2',
            score: 10
          }, {
            name: 'webpack',
            score: 30
          }, {
            name: 'MongoDB',
            score: 40
          }, {
            name: 'Java',
            score: 40
          }, {
            name: 'Android SDK',
            score: 50
          }, {
            name: 'Git/Svn',
            score: 60
          }, {
            name: 'Linux',
            score: 30
          }, {
            name: 'macOS',
            score: 80
          }]
        }
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

  @import "../../common/css/color.scss";

  .h-white {
    width: 100%;
    font-size: 12px;
    padding-bottom: 8px;
    margin-bottom: 8px;
    margin-top: 36px;
    border-bottom: 1px solid #fff;
  }

  .h-blue {
    color: $color-primary;
    width: 100%;
    font-size: 12px;
    padding-bottom: 4px;
    margin-bottom: 4px;
    margin-top: 12px;
    border-bottom: 1px solid $color-primary;
  }

  a {
    color: $pink400;
  }

  .page {
    display: flex;
  }

  .left {
    padding: 18px;
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: $color-primary;
    color: #fff;

    #header {
      display: flex;
      flex-direction: column;
      align-items: center;

      .avatar {
        margin-top: 18px;
        height: 75px;
        width: 75px;
        background: url(http://img.hb.aicdn.com/19dd42725e125bb7424785afbddeee41d5eb13931b097-evWO7z_fw658) center no-repeat;
        background-size: cover;
        border-radius: 50%;
        box-shadow: 5px 10px 10px $blue500;
      }

      .job {
        margin-top: 12px;
        font-size: 21px;
      }

      .name {
        font-size: 16px;
      }
    }

    #baseInfo {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      font-size: 12px;
    }

    #vocationalSkill {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 12px;

      .skill-item {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 100%;

        .progress {
          margin-left: 12px;
          width: 200px;
        }
      }

      .point {
        display: inline-block;
        width: 3px;
        height: 3px;
        background: #fff;
        border-radius: 50%;
        margin-left: 5px;
        margin-right: 5px;
      }

      .item {
        margin-top: 4px;
      }
    }
  }

  .right {
    width: 70%;
    padding-left: 18px;
    padding-right: 9px;

    .works {
      font-size: 12px;
      .work-item {
        .work-title {
          display: flex;
          justify-content: space-between;
        }
      }
    }

    .self-assessment {
      font-size: 12px;
      .project-name {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
      }
      .project-intro {
        padding-top: 3px;
        /*text-indent: 26px;*/
        /*padding-left: 10px;*/
      }
    }

    .point {
      display: inline-block;
      width: 3px;
      height: 3px;
      background: #000;
      border-radius: 50%;
      margin-left: 5px;
      margin-right: 5px;
    }

    .projects {
      font-size: 12px;
      margin-top: 3px;
      .project-name {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
      }
      .project-intro {
        padding-top: 3px;
        /*text-indent: 26px;*/
        padding-left: 13px;
      }
    }

  }
</style>

<!--<style lang="scss" rel="stylesheet/scss" scoped>-->

<!--@import "../../common/css/color.scss";-->

<!--.h-white {-->
<!--width: 100%;-->
<!--font-size: 24px;-->
<!--padding-bottom: 8px;-->
<!--margin-bottom: 8px;-->
<!--margin-top: 36px;-->
<!--border-bottom: 1px solid #fff;-->
<!--}-->

<!--.h-blue {-->
<!--color: $color-primary;-->
<!--width: 100%;-->
<!--font-size: 24px;-->
<!--padding-bottom: 8px;-->
<!--margin-bottom: 8px;-->
<!--margin-top: 24px;-->
<!--border-bottom: 1px solid $color-primary;-->
<!--}-->

<!--a {-->
<!--color: $pink400;-->
<!--}-->

<!--.page {-->
<!--display: flex;-->
<!--}-->

<!--.left {-->
<!--padding: 36px;-->
<!--width: 30%;-->
<!--display: flex;-->
<!--flex-direction: column;-->
<!--align-items: center;-->
<!--background-color: $color-primary;-->
<!--color: #fff;-->

<!--#header {-->
<!--display: flex;-->
<!--flex-direction: column;-->
<!--align-items: center;-->

<!--.avatar {-->
<!--margin-top: 36px;-->
<!--height: 150px;-->
<!--width: 150px;-->
<!--background: url(http://img.hb.aicdn.com/19dd42725e125bb7424785afbddeee41d5eb13931b097-evWO7z_fw658) center no-repeat;-->
<!--background-size: cover;-->
<!--border-radius: 50%;-->
<!--box-shadow: 5px 10px 10px $blue500;-->
<!--}-->

<!--.job {-->
<!--margin-top: 24px;-->
<!--font-size: 42px;-->
<!--}-->

<!--.name {-->
<!--font-size: 32px;-->
<!--}-->
<!--}-->

<!--#baseInfo {-->
<!--width: 100%;-->
<!--display: flex;-->
<!--flex-direction: column;-->
<!--align-items: flex-start;-->
<!--font-size: 14px;-->
<!--}-->

<!--#vocationalSkill {-->
<!--width: 100%;-->
<!--display: flex;-->
<!--flex-direction: column;-->
<!--justify-content: space-between;-->
<!--font-size: 14px;-->

<!--.skill-item {-->
<!--display: flex;-->
<!--align-items: center;-->
<!--justify-content: flex-end;-->
<!--width: 100%;-->

<!--.progress {-->
<!--margin-left: 24px;-->
<!--width: 200px;-->
<!--}-->
<!--}-->

<!--.point {-->
<!--display: inline-block;-->
<!--width: 6px;-->
<!--height: 6px;-->
<!--background: #fff;-->
<!--border-radius: 50%;-->
<!--margin-left: 10px;-->
<!--margin-right: 10px;-->
<!--}-->

<!--.item {-->
<!--margin-top: 8px;-->
<!--}-->
<!--}-->
<!--}-->

<!--.right {-->
<!--width: 70%;-->
<!--padding: 0 36px;-->

<!--.works {-->
<!--.work-item {-->
<!--.work-title {-->
<!--display: flex;-->
<!--justify-content: space-between;-->
<!--}-->
<!--}-->
<!--}-->

<!--.point {-->
<!--display: inline-block;-->
<!--width: 6px;-->
<!--height: 6px;-->
<!--background: #000;-->
<!--border-radius: 50%;-->
<!--margin-left: 10px;-->
<!--margin-right: 10px;-->
<!--}-->

<!--.projects {-->
<!--margin-top: 6px;-->
<!--.project-name {-->
<!--display: flex;-->
<!--align-items: center;-->
<!--flex-wrap: wrap;-->
<!--}-->
<!--.project-intro {-->
<!--padding-top: 6px;-->
<!--/*text-indent: 26px;*/-->
<!--padding-left: 26px;-->
<!--}-->
<!--}-->

<!--}-->
<!--</style>-->



