const gulp = require('gulp');
const rename = require('gulp-rename');
const replace = require('gulp-replace');

const options = (argv => {
  const args = {};
  let option;

  for (let i = 0; i < argv.length; i++) {
    const unparsedArg = argv[i].trim();
    const parsedArg = unparsedArg.replace(/^\-+/, '');

    if (parsedArg !== unparsedArg) {
      option = parsedArg.replace(/\-/g, '_');
      args[option] = true;
    } else {
      if (option) {
        args[option] = parsedArg;
      }

      option = null;
    }
  }

  return args;
})(process.argv);

function build(cb) {
  const basePath = './';
  const distPath = `${basePath}dist`;

  // ---------- Build the base file ---------- //

  gulp.src(['./src/base.xml'])
    .pipe(rename(`${options.tenant_name}_B2C_1A_base.xml`))
    .pipe(replace('__TenantName__', options.tenant_name))
    .pipe(gulp.dest(distPath));

  // ---------- Build the extension file ---------- //

  gulp.src(['./src/extension.xml'])
    .pipe(rename(`${options.tenant_name}_B2C_1A_extension.xml`))
    .pipe(replace('__TenantName__', options.tenant_name))
    .pipe(replace('__IEFAuthenticationApplication_ClientId__', options.ief_authentication_application_client_id))
    .pipe(replace('__IEFAuthenticationProxyApplication_ClientId__', options.ief_authentication_proxy_application_client_id))
    .pipe(replace('__IEFExtensionApplication_Id__', options.ief_extension_application_id))
    .pipe(replace('__IEFExtensionApplication_ClientId__', options.ief_extension_application_client_id))
    .pipe(gulp.dest(distPath));

  // ---------- Build the relying party email linking file ---------- //

  gulp.src(['./src/email_linking.xml'])
    .pipe(rename(`${options.tenant_name}_B2C_1A_email_linking.xml`))
    .pipe(replace('__TenantName__', options.tenant_name))
    .pipe(gulp.dest(distPath));

  // ---------- Build the relying party email sign-up or any sign-in file ---------- //

  gulp.src(['./src/email_sign_up_any_sign_in.xml'])
    .pipe(rename(`${options.tenant_name}_B2C_1A_email_sign_up_any_sign_in.xml`))
    .pipe(replace('__TenantName__', options.tenant_name))
    .pipe(gulp.dest(distPath));

  // ---------- Build the relying party phone linking file ---------- //

  gulp.src(['./src/phone_linking.xml'])
    .pipe(rename(`${options.tenant_name}_B2C_1A_phone_linking.xml`))
    .pipe(replace('__TenantName__', options.tenant_name))
    .pipe(gulp.dest(distPath));

  // ---------- Build the relying party phone sign-up or any sign-in file ---------- //

  gulp.src(['./src/phone_sign_up_any_sign_in.xml'])
    .pipe(rename(`${options.tenant_name}_B2C_1A_phone_sign_up_any_sign_in.xml`))
    .pipe(replace('__TenantName__', options.tenant_name))
    .pipe(gulp.dest(distPath));

  // ---------- Build the relying party sign-in with verification file ---------- //

  gulp.src(['./src/sign_in_with_verification.xml'])
    .pipe(rename(`${options.tenant_name}_B2C_1A_sign_in_with_verification.xml`))
    .pipe(replace('__TenantName__', options.tenant_name))
    .pipe(gulp.dest(distPath));

  // ---------- Build the relying party sign-up or sign-in file ---------- //

  gulp.src(['./src/sign_up_sign_in.xml'])
    .pipe(rename(`${options.tenant_name}_B2C_1A_sign_up_sign_in.xml`))
    .pipe(replace('__TenantName__', options.tenant_name))
    .pipe(gulp.dest(distPath));

  // ---------- Build the relying party sign-up or sign-in v2 file ---------- //

  gulp.src(['./src/sign_up_sign_in_v2.xml'])
    .pipe(rename(`${options.tenant_name}_B2C_1A_sign_up_sign_in_v2.xml`))
    .pipe(replace('__TenantName__', options.tenant_name))
    .pipe(replace('__FunctionApp_BaseUrl__', options.function_app_base_url))
    .pipe(replace('__FunctionApp_Key__', options.function_app_key))
    .pipe(gulp.dest(distPath));

  // ---------- Build the relying party sign-up with Have I Been Pwned (HIBP) file ---------- //

  gulp.src(['./src/sign_up_with_hibp.xml'])
    .pipe(rename(`${options.tenant_name}_B2C_1A_sign_up_with_hibp.xml`))
    .pipe(replace('__TenantName__', options.tenant_name))
    .pipe(replace('__FunctionApp_BaseUrl__', options.function_app_base_url))
    .pipe(replace('__FunctionApp_Key__', options.function_app_key))
    .pipe(gulp.dest(distPath));

  // ---------- Build the relying party sign-up with Keen file ---------- //

  gulp.src(['./src/sign_up_with_keen.xml'])
    .pipe(rename(`${options.tenant_name}_B2C_1A_sign_up_with_keen.xml`))
    .pipe(replace('__TenantName__', options.tenant_name))
    .pipe(replace('__FunctionApp_BaseUrl__', options.function_app_base_url))
    .pipe(replace('__FunctionApp_Key__', options.function_app_key))
    .pipe(gulp.dest(distPath));

  // ---------- Build the relying party sign-up with Mailgun file ---------- //

  gulp.src(['./src/sign_up_with_mailgun.xml'])
    .pipe(rename(`${options.tenant_name}_B2C_1A_sign_up_with_mailgun.xml`))
    .pipe(replace('__TenantName__', options.tenant_name))
    .pipe(replace('__FunctionApp_BaseUrl__', options.function_app_base_url))
    .pipe(replace('__FunctionApp_Key__', options.function_app_key))
    .pipe(gulp.dest(distPath));

  // ---------- Build the relying party sign-up with Mandrill file ---------- //

  gulp.src(['./src/sign_up_with_mandrill.xml'])
    .pipe(rename(`${options.tenant_name}_B2C_1A_sign_up_with_mandrill.xml`))
    .pipe(replace('__TenantName__', options.tenant_name))
    .pipe(replace('__FunctionApp_BaseUrl__', options.function_app_base_url))
    .pipe(replace('__FunctionApp_Key__', options.function_app_key))
    .pipe(gulp.dest(distPath));

  // ---------- Build the relying party sign-up with SendGrid file ---------- //

  gulp.src(['./src/sign_up_with_sendgrid.xml'])
    .pipe(rename(`${options.tenant_name}_B2C_1A_sign_up_with_sendgrid.xml`))
    .pipe(replace('__TenantName__', options.tenant_name))
    .pipe(replace('__FunctionApp_BaseUrl__', options.function_app_base_url))
    .pipe(replace('__FunctionApp_Key__', options.function_app_key))
    .pipe(gulp.dest(distPath));

  // ---------- Build the relying party sign-up without verification file ---------- //

  gulp.src(['./src/sign_up_without_verification.xml'])
    .pipe(rename(`${options.tenant_name}_B2C_1A_sign_up_without_verification.xml`))
    .pipe(replace('__TenantName__', options.tenant_name))
    .pipe(gulp.dest(distPath));

  cb();
}

exports.build = build;
