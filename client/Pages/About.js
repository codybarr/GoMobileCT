import React from 'react';

import { Link } from 'react-router';

export default class Locations extends React.Component {

  render() {
    return (
      <div class="about">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <h1>About Us</h1>
            </div>
          </div>
        </div>

        <div class="container-fluid">
         <div class="row">
           <div class="col-sm-6">
             <img style={{marginBottom: '20px'}} class="img-responsive" src="/images/client_inside.jpg" alt="" />
           </div>

           <div class="col-sm-6">
             <h2>DRIVING TO YOU SO YOU CAN FIND OUT FOR SURE</h2>
             <p>You can expect a professional and friendly environment Our goal is to help alleviate any concerns you may have about your unplanned pregnancy. We know, most unplanned pregnancies are one of the most difficult life-changing things you will ever deal with. We do not take it lightly and will provide you with a decision aid to work through, along with a patient advocate that can help with emotional and educational support.</p>
             <p><Link to="contact" class="btn btn-raised btn-primary">Contact Us</Link></p>
           </div>
         </div>
        </div>

        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-4 text-center featured-item">
              <i class="fa fa-medkit fa-4x" aria-hidden="true"></i>
              <h4>Pregnancy Testing</h4>
              <p>
                Every woman's first visit to us starts with a free pregnancy test.   We take the time to evaluate the unique challenges that may be lurking, so that a custom program of pregnancy care can be created and we can refer you to the right places.  We do not do nor refer for abortion.
              </p>
            </div>
            <div class="col-sm-4 text-center featured-item">
              <i class="fa fa-hospital-o fa-4x" aria-hidden="true"></i>
              <h4>Limited Diagnostic Ultrasound</h4>
              <p>
                Our highly trained ultrasound technicians will provide pregnancy confirmation, fetal heart rate, fetal  location and size to determine age and approximate due date.  Our limited diagnostic ultrasound does not replace Physician or Health Care Provider's ultrasound.  We cannot tell you the gender of the baby.
              </p>
            </div>
            <div class="col-sm-4 text-center featured-item">
            <i class="fa fa-comments-o fa-4x" aria-hidden="true"></i>
              <h4>Decision Aid & Community Referrals</h4>
              <p>
                Once it has been determined that you are pregnant, a client advocate from a local pregnancy center will help you work out the details of your pregnancy and work through many concerns you may have. GoMobileCT has standard decision aids on board to help you work through your choices. The choice is only YOURS and each one is unique.
              </p>
            </div>
          </div>
        </div>

        <div class="container-fluid">
         <div class="row centered">
           <h2 class="text-center">A DREAM TEAM TO PUT YOU AT EASE.</h2>

           <div class="col-sm-6 text-center">
             <div class="he-wrap tpl6">
               <img src="/images/team/drdan.jpg" alt="" />
             </div>
             <h4>Daniel O'Neill, M.D.</h4>
             <h5 class="ctitle">Medical Director</h5>
             <p>"Dr. Dan" manages our ever-important medical services.</p>
             <div class="hline"></div>
           </div>

           <div class="col-sm-6 text-center">
             <div class="he-wrap tpl6">
               <img src="/images/team/kerry.jpg" alt="" />
             </div>
             <h4>Kerry Johnson, RDMS</h4>
             <h5 class="ctitle">Registered Diagnostic Medical Sonograher</h5>
             <p>​Kerry takes those lovely pictures of your baby.</p>
             <div class="hline"></div>
           </div>
         </div>
       </div>

       <div class="container-fluid">
        <div class="row">
          <div class="col-sm-12">
            <h2 class="text-center">WHO WE ARE</h2>
            <p>GoMobileCT is a service provided by Caring Families Pregnancy Services, Inc. Caring Families has been a part of the northeast CT community for 30 years.  Caring Families is currently doing business as the Women's Center Eastern CT in Willimantic and now we are offering free services through GoMobileCT.</p>
            <p>GoMobileCT is partnering with other agencies and locations to help provide services to you closer to home.  Be on the lookout for the van and check our <Link to="locations">locations</Link> page to see where and when the mobile unit will be parked.</p>
          </div>
        </div>
       </div>

      </div>
    );
  }
}
