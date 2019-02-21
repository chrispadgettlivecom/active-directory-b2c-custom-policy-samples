const gulp = require('gulp');
const config = require('config');
const rename = require('gulp-rename');
const replace = require('gulp-replace');

function build(cb) {
  const basePath = './';
  const distPath = `${basePath}dist`;

  // ---------- Build the base file ---------- //

  gulp.src(['./src/base.xml'])
    .pipe(rename(`${config.tenant.name}_B2C_1A_base.xml`))
    .pipe(replace('__TenantName__', config.tenant.name))
    .pipe(gulp.dest(distPath));

  // ---------- Build the extension file ---------- //

  gulp.src(['./src/extension.xml'])
    .pipe(rename(`${config.tenant.name}_B2C_1A_extension.xml`))
    .pipe(replace('__TenantName__', config.tenant.name))
    .pipe(replace('__IEFAuthenticationApplication_ClientId__', config.iefAuthenticationApplication.clientId))
    .pipe(replace('__IEFAuthenticationProxyApplication_ClientId__', config.iefAuthenticationProxyApplication.clientId))
    .pipe(replace('__IEFExtensionApplication_Id__', config.iefExtensionApplication.id))
    .pipe(replace('__IEFExtensionApplication_ClientId__', config.iefExtensionApplication.clientId))
    .pipe(gulp.dest(distPath));

  // ---------- Build the relying party sign-up or sign-in file ---------- //

  gulp.src(['./src/sign_up_sign_in.xml'])
    .pipe(rename(`${config.tenant.name}_B2C_1A_sign_up_sign_in.xml`))
    .pipe(replace('__TenantName__', config.tenant.name))
    .pipe(gulp.dest(distPath));

  // ---------- Build the relying party sign-up without verification file ---------- //

  gulp.src(['./src/sign_up_without_verification.xml'])
    .pipe(rename(`${config.tenant.name}_B2C_1A_sign_up_without_verification.xml`))
    .pipe(replace('__TenantName__', config.tenant.name))
    .pipe(gulp.dest(distPath));

  // ---------- Build the relying party sign-in with verification file ---------- //

  gulp.src(['./src/sign_in_with_verification.xml'])
    .pipe(rename(`${config.tenant.name}_B2C_1A_sign_in_with_verification.xml`))
    .pipe(replace('__TenantName__', config.tenant.name))
    .pipe(gulp.dest(distPath));

  // ---------- Build the relying party email sign-up or any sign-in file ---------- //

  gulp.src(['./src/email_sign_up_any_sign_in.xml'])
    .pipe(rename(`${config.tenant.name}_B2C_1A_email_sign_up_any_sign_in.xml`))
    .pipe(replace('__TenantName__', config.tenant.name))
    .pipe(gulp.dest(distPath));

  // ---------- Build the relying party phone sign-up or any sign-in file ---------- //

  gulp.src(['./src/phone_sign_up_any_sign_in.xml'])
    .pipe(rename(`${config.tenant.name}_B2C_1A_phone_sign_up_any_sign_in.xml`))
    .pipe(replace('__TenantName__', config.tenant.name))
    .pipe(gulp.dest(distPath));

    // ---------- Build the relying party email linking file ---------- //
  
    gulp.src(['./src/email_linking.xml'])
      .pipe(rename(`${config.tenant.name}_B2C_1A_email_linking.xml`))
      .pipe(replace('__TenantName__', config.tenant.name))
      .pipe(gulp.dest(distPath));
  
    // ---------- Build the relying party phone linking file ---------- //
  
    gulp.src(['./src/phone_linking.xml'])
      .pipe(rename(`${config.tenant.name}_B2C_1A_phone_linking.xml`))
      .pipe(replace('__TenantName__', config.tenant.name))
      .pipe(gulp.dest(distPath));

  cb();
}

exports.build = build;
