{ pkgs }: {
  deps = [
    pkgs.php82
    pkgs.nodejs-14_x
    pkgs.nodePackages.typescript-language-server
    pkgs.yarn
    pkgs.replitPackages.jest
    pkgs.libuuid
    pkgs.php
    pkgs.nodejs
  ];
  env = {
    LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [pkgs.libuuid];
    PATH = "${pkgs.php}/bin:${pkgs.nodejs}/bin:${pkgs.coreutils}/bin";
  };
}
