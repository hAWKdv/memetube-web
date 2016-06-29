import { join } from 'path';

import { SeedConfig } from './seed.config';
import { InjectableDependency } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {
  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');
  SYSTEM_CONFIG: any = {
    defaultJSExtensions: true,
    packageConfigPaths: [
      `/node_modules/*/package.json`,
      `/node_modules/@ngrx/store/package.json`,
      `/node_modules/**/package.json`,
      `/node_modules/@angular/*/package.json`,
    ],
    paths: {
      [this.BOOTSTRAP_MODULE]: `${this.APP_BASE}${this.BOOTSTRAP_MODULE}`,
      '@angular/common': `node_modules/@angular/common/bundles/common.umd.js`,
      '@angular/compiler': `node_modules/@angular/compiler/bundles/compiler.umd.js`,
      '@angular/core': `node_modules/@angular/core/bundles/core.umd.js`,
      '@angular/forms': `node_modules/@angular/forms/bundles/forms.umd.js`,
      '@angular/http': `node_modules/@angular/http/bundles/http.umd.js`,
      '@angular/platform-browser': `node_modules/@angular/platform-browser/bundles/platform-browser.umd.js`,
      '@angular/platform-browser-dynamic': `node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js`,
      '@angular/router': `node_modules/@angular/router/index.js`,
      'rxjs/*': `node_modules/rxjs/*`,
      'app/*': `/app/*`,
      '*': `node_modules/*`
    },
    packages: {
      rxjs: { defaultExtension: false }
    }
  };

  SYSTEM_BUILDER_CONFIG: any = {
    defaultJSExtensions: true,
    packageConfigPaths: [
      join(this.PROJECT_ROOT, 'node_modules', '*', 'package.json'),
      join(this.PROJECT_ROOT, 'node_modules', '@ngrx', 'store', 'package.json'),
      join(this.PROJECT_ROOT, 'node_modules', '@angular', '*', 'package.json')
    ],
    paths: {
      [`${this.TMP_DIR}/*`]: `${this.TMP_DIR}/*`,
      '*': 'node_modules/*'
    },
    packages: {
      '@angular/common': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      '@angular/compiler': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      '@angular/core': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      '@angular/forms': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      '@angular/http': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      '@angular/platform-browser': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      '@angular/platform-browser-dynamic': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      '@angular/router': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      'rxjs': {
        defaultExtension: 'js'
      }
    }
  };

  constructor() {
    super();

    this.APP_TITLE = 'MemeTube';

    let additional_deps: InjectableDependency[] = [
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
    ];

    const seedDependencies = this.NPM_DEPENDENCIES;

    this.NPM_DEPENDENCIES = seedDependencies.concat(additional_deps);

    /* Add to or override NPM module configurations: */
    //this.mergeObject( this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false } );
  }
}
