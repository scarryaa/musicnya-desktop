{ pkgs ? import <nixpkgs> {} }:

let
  lib = import <nixpkgs/lib>;
  buildNodeJs = pkgs.callPackage <nixpkgs/pkgs/development/web/nodejs/nodejs.nix> {};
  fetchurl = pkgs.fetchurl;
  electron = pkgs.electron_23;
  python3 = pkgs.python3;
  openssl = pkgs.openssl;
  callPackage = pkgs.callPackage;

  nodejsVersion = "18.16.1";

  buildNodejs = callPackage ./nodejs.nix {
    inherit openssl;
    python = python3;
  };

  electron-castlabs = pkgs.electron_23.overrideAttrs (oldAttrs: rec {
    pname = "electron-castlabs";
    version = "23.0.0";
    src = fetchurl {
      url = "https://github.com/castlabs/electron-releases/releases/download/v${version}+wvcus/electron-v${version}+wvcus-linux-x64.zip";
      hash = "sha256-Cceac53Xx0nRe9rp3Z5uHPtnMFafIf7jfS5lErpa8oU=";
    };
  });

  NPM_CONFIG_PREFIX = toString ./npm_config_prefix;

in pkgs.mkShell {
  packages = with pkgs; [
    clang
    llvmPackages.bintools
    rustup
    nodejs
    nodePackages.npm
    electron-castlabs
    p7zip
    appimage-run
  ];

  RUSTC_VERSION = pkgs.lib.readFile ./rust-toolchain;
  LIBCLANG_PATH = pkgs.lib.makeLibraryPath [ pkgs.llvmPackages_latest.libclang.lib ];
  inherit NPM_CONFIG_PREFIX;

  shellHook = ''
    export PATH="${NPM_CONFIG_PREFIX}/bin:$PATH"
    export PATH=$PATH:''${CARGO_HOME:-~/.cargo}/bin
    export PATH=$PATH:''${RUSTUP_HOME:-~/.rustup}/toolchains/$RUSTC_VERSION-x86_64-unknown-linux-gnu/bin/
  '';

  BINDGEN_EXTRA_CLANG_ARGS = 
  (builtins.map (a: ''-I"${a}/include"'') [
      pkgs.glibc.dev 
  ])

  ++ [
    ''-I"${pkgs.llvmPackages_latest.libclang.lib}/lib/clang/${pkgs.llvmPackages_latest.libclang.version}/include"''
    ''-I"${pkgs.glib.dev}/include/glib-2.0"''
    ''-I${pkgs.glib.out}/lib/glib-2.0/include/''
    ];
}
