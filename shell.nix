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
    nodejs
    nodePackages.npm
    electron-castlabs
  ];

  inherit NPM_CONFIG_PREFIX;

  shellHook = ''
    export PATH="${NPM_CONFIG_PREFIX}/bin:$PATH"
  '';
}